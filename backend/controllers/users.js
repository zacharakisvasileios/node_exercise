const User = require("../models/user");
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

exports.getUserMessageExchange = (req, res, next) => {
  const userId = req.params.userId;
  User.findByPk(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
      res.status(200).json({ user: user });
    })
    .catch((err) => console.log(err));
};

exports.getUserConversationList = (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  User.create({
    name: name,
    email: email,
  })
    .then((result) => {
      console.log("Created User");
      res.status(201).json({
        message: "User created successfully!",
        user: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
