const { DataTypes } = require("sequelize");
const {mysql }= require("../config/Sqldb");

const User = mysql.define("User", {
  ID: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  Name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // Email should be unique
  },
  Phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: "Users",
  timestamps: false,
});

module.exports = User;
