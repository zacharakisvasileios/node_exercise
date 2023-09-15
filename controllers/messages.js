const Message = require("../models/message");
const XLSX = require("xlsx");
require("dotenv").config();

// Parse seed file using xslx, convert to JSON and then use
// sequelize bulk insert to populate the db
exports.feedDB = (req, res, next) => {
  // Try parse the seed file, if seed file missing, return 500
  try {
    // If no users and messages in the seed file, return 404
    if (!sheets.Sheets || !sheets.SheetNames.includes("messages", "users"))
      return res.status(404).json("Missing data in seed file");

    // Different time formats presented with the same way in seed file
    const sheets = XLSX.readFile(process.env.SEED_FILE, {
      // Number formats and values are attached to cells. The following keys are used:
      // Generated formatted text to the .w field SheetJS Representation
      cellText: false,
      // The default behavior for all parsers is to generate number cells.
      // Setting cellDates to true will force the parsers to store dates: 2048-10-06T00:00:00.000Z
      cellDates: true,
    });

    const users = XLSX.utils.sheet_to_json(sheets.Sheets["users"], {
      // By default, sheet_to_json scans the first row and uses the values as headers.
      // With the header: 1 option, the function exports an array of arrays of values.
      header: 1,
      blankrows: false,
      dateNF: "m-d-yyyy",
      raw: false, // we use formatted strings, so raw is set to false
    });
    const messages = XLSX.utils.sheet_to_json(sheets.Sheets["messages"], {
      header: 1,
      blankrows: false,
      dateNF: "yyyy-mm-dd hh:mm:ss",
      raw: false,
    });
    return res.status(200).json(users);
  } catch ({ name, message }) {
    //TODO more specific error handling?
    return res.status(500).json(message);
  }
};

exports.createMessage = (req, res, next) => {
  const userId = req.params.userId;
  Message.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
      res.status(200).json({ user: user });
    })
    .catch((err) => console.log(err));
};

exports.updateMessage = (req, res, next) => {};

exports.getMessages = (req, res, next) => {};
