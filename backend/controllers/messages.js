const Message = require("../models/message");
const User = require("../models/user");
const XLSX = require("xlsx");
const db = require("../util/database");
const { Op, QueryTypes } = require("sequelize");
require("dotenv").config();

// Parse seed file using xslx, convert to JSON and then use
// sequelize bulk insert to populate the db
exports.feedDB = async (req, res) => {
  // Try parse the seed file, if seed file missing, return 500
  try {
    // Different time formats presented with the same way in seed file
    const sheets = XLSX.readFile(process.env.SEED_FILE, {
      // Number formats and values are attached to cells. The following keys are used:
      // Generated formatted text to the .w field SheetJS Representation
      cellText: false,
      // The default behavior for all parsers is to generate number cells.
      // Setting cellDates to true will force the parsers to store dates: 2048-10-06T00:00:00.000Z
      cellDates: true,
    });

    // If no users and messages in the seed file, return 404
    if (!sheets.Sheets || !sheets.SheetNames.includes("messages", "users"))
      return res.status(404).json("Missing data in seed file");

    let users = XLSX.utils.sheet_to_json(sheets.Sheets["users"], {
      header: "A",
      blankrows: false,
      dateNF: "m-d-yyyy",
      raw: false, // we use formatted strings, so raw is set to false
    });
    let messages = XLSX.utils.sheet_to_json(sheets.Sheets["messages"], {
      header: "A",
      blankrows: false,
      dateNF: "yyyy-mm-dd hh:mm:ss",
      raw: false,
    });
    // Messages and users are array of objects, with the Excel row values A,B...F as keys
    // We replace them with the ones used in their corresponding tables
    messages = messages.map((item) => {
      return {
        id: item.A,
        content: item.B,
        sender: item.C,
        receiver: item.D,
        seen: item.E,
        timestampSent: item.F,
      };
    });
    users = users.map((item) => {
      return {
        id: item.A,
        firstName: item.B,
        surname: item.C,
        dateOfBirth: item.D,
        sex: item.E,
        username: item.F,
      };
    });
    Message.bulkCreate(messages)
      .then(() => {
        User.bulkCreate(users);
      })
      .then(() => {
        return res.json("Database populated successfully");
      })
      .catch((e) => {
        return res.json(e.message);
      });
  } catch ({ message }) {
    return res.json(message);
  }
};

exports.createMessage = async (req, res) => {
  try {
    // we have already inserted data, Message.create will use id: 1 and cause validation
    // error. Since no nextval() exists in sequelize, raw query instead to get maximum
    // value of id
    const id = await db.query('SELECT MAX(id) + 1 FROM "messages"', {
      type: QueryTypes.SELECT,
    });
    // Temporary fis, result is wrapped in questionmarks
    // TODO check why
    await Message.create({
      id: id[0]["?column?"],
      content: req.body.content,
      sender: req.body.sender,
      receiver: req.body.receiver,
      seen: req.body.seen,
      timestampSent: req.body.timestampSent,
    });
    res.json({
      message: "Message created successfully",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    // Validate data also in FE
    // TODO use joi or express-validator
    await Message.update(req.body, {
      where: { id: req.params.id },
    });
    res.json({
      message: "Message updated succesfully",
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// Number of parameters may vary, so we check for params
// and then construct the query. For sake of simplicity
// and since it covers our frontend needs, we only use eq
exports.getMessages = async (req, res) => {
  try {
    let searchStr = {};
    if (req.query.id) {
      searchStr.id = {
        [Op.eq]: `${req.query.id}`,
      };
    }
    if (req.query.content) {
      searchStr.content = {
        [Op.eq]: `${req.query.content}`,
      };
    }
    if (req.query.sender) {
      searchStr.sender = {
        [Op.eq]: `${req.query.sender}`,
      };
    }
    if (req.query.receiver) {
      searchStr.receiver = {
        [Op.eq]: `${req.query.receiver}`,
      };
    }
    if (req.query.seen) {
      searchStr.seen = {
        [Op.eq]: `${req.query.seen}`,
      };
    }
    const messages = await Message.findAll({
      where: searchStr,
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    return res.status(200).json(messages);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// utility function used for development
exports.deleteAllMessages = async (_, res) => {
  await Message.sync({ force: true });
  return res.status(200).json("All messages have been successfully deleted");
};
