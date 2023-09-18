const Sequelize = require("sequelize");
const db = require("../util/database");

const User = db.define("user", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  firstName: Sequelize.STRING,
  surname: Sequelize.STRING,
  dateOfBirth: Sequelize.STRING,
  sex: Sequelize.STRING,
  username: Sequelize.STRING,
});

module.exports = User;
