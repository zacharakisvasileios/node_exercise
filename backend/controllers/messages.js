const Message = require("../models/message");
const User = require("../models/user");
const XLSX = require("xlsx");
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
      .then((users) => {
        return res.json("Database populated successfully");
      });
  } catch ({ message }) {
    return res.json(message);
  }
};

exports.createMessage = async (req, res) => {
  try {
    await Message.create({
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

exports.updateMessage = (req, res, next) => {};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    return res.status(200).json(messages);
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.deleteAllMessages = async (_, res) => {
  await Message.sync({ force: true });
  return res.status(200).json("All messages have been successfully deleted");
};
