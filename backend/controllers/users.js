const User = require("../models/user");
const Message = require("../models/message");
const { Op } = require("sequelize");

// Number of parameters may vary, so we check for params
// and then construct the query. For sake of simplicity
// and since it covers our frontend needs, we only use eq
exports.getUsers = async (req, res) => {
  try {
    let searchStr = {};
    if (req.body.id) {
      searchStr.id = {
        [Op.eq]: `${req.body.id}`,
      };
    }
    if (req.body.firstName) {
      searchStr.firstName = {
        [Op.eq]: `${req.body.firstName}`,
      };
    }
    if (req.body.surname) {
      searchStr.surname = {
        [Op.eq]: `${req.body.surname}`,
      };
    }
    if (req.body.dateOfBirth) {
      searchStr.dateOfBirth = {
        [Op.eq]: `${req.body.dateOfBirth}`,
      };
    }
    if (req.body.sex) {
      searchStr.sex = {
        [Op.eq]: `${req.body.sex}`,
      };
    }
    if (req.body.username) {
      searchStr.username = {
        [Op.eq]: `${req.body.username}`,
      };
    }
    const users = await User.findAll({
      where: searchStr,
    });
    return res.status(200).json(users);
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.getUserMessages = (req, res, next) => {
  if (!req.body.userA)
    return res.status(400).json({ message: "First user missing!" });
  if (!req.body.userB)
    return res.status(400).json({ message: "Second user missing!" });
  try {
    const userA = req.body.userA;
    const userB = req.body.userB;
    Message.findAll({
      where: {
        // We need to combine Op.or and Op.and to check for multiple clauses
        [Op.or]: [
          {
            [Op.and]: [{ sender: userA }, { receiver: userB }],
          },
          {
            [Op.and]: [{ sender: userB }, { receiver: userA }],
          },
        ],
      },
      // get the most recent one first
      order: [["timestampSent", "DESC"]],
    })
      .then((messages) => {
        res.status(200).json(messages);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.json({ message: error.message });
  }
};

exports.getUserConversationList = (req, res, next) => {
  if (!req.body.userId)
    return res.status(400).json({ message: "User id missing!" });
  const userId = req.body.userId;
  try {
    // Get all messages where the user is either sender or receiver
    Message.findAll({
      where: {
        [Op.or]: [{ sender: userId }, { receiver: userId }],
      },
      // sender and receiver ids suffice for our needs
      attributes: ["sender", "receiver"],
      // TODO should be ASC later on, since it is pushed to our array
      order: [["timestampSent", "DESC"]],
    })
      .then(async (messages) => {
        // iterate the array of sender and receivers and exclude the requested user id
        var tempDialogIds = [];
        for (var i = 0; i < messages.length; i++) {
          if (messages[i].receiver === parseInt(userId))
            tempDialogIds.push(messages[i].sender);
          else if (messages[i].sender === parseInt(userId)) {
            tempDialogIds.push(messages[i].receiver);
          }
        }
        // remove duplicates
        const dialogIds = [...new Set(tempDialogIds)];
        return res.status(200).json(dialogIds);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.json({ message: error.message });
  }
};

//TODO remove, only for test needs
exports.getUserConversationListMessages = (req, res, next) => {
  if (!req.body.userId)
    return res.status(400).json({ message: "User id missing!" });
  const userId = req.body.userId;
  try {
    // Get all messages where the user is either sender or receiver
    Message.findAll({
      where: {
        [Op.or]: [{ sender: userId }, { receiver: userId }],
      },
      // sender and receiver ids suffice for our needs
      attributes: ["sender", "receiver"],
      order: [["timestampSent", "DESC"]],
    })
      .then((messages) => {
        res.status(200).json(messages);
      })
      .catch((err) => console.log(err));
  } catch (error) {
    res.json({ message: error.message });
  }
};
