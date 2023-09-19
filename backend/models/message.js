const Sequelize = require("sequelize");
const db = require("../util/database");

const Message = db.define("message", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  content: Sequelize.STRING,
  sender: Sequelize.INTEGER,
  receiver: Sequelize.INTEGER,
  seen: Sequelize.BOOLEAN,
  timestampSent: Sequelize.STRING,
});

module.exports = Message;
