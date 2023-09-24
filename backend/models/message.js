const Sequelize = require("sequelize");
const db = require("../util/database");
//const User = require("./user");

const Message = db.define("message", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
    unique: true,
    noUpdate: true,
  },
  content: Sequelize.STRING,
  sender: Sequelize.INTEGER,
  receiver: Sequelize.INTEGER,
  seen: Sequelize.BOOLEAN,
  timestampSent: Sequelize.STRING,
});
/*
Message.belongsTo(User, {
  foreignKey: "sender",
  targetKey: "id",
});
Message.belongsTo(User, {
  foreignKey: "receiver",
  targetKey: "id",
});
*/
module.exports = Message;
