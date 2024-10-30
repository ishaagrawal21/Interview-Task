const { DataTypes } = require("sequelize");
const sequelize = require("../config");

const User = sequelize.define(
  "User",
  {
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    access_token: { type: DataTypes.STRING },
    refresh_token: { type: DataTypes.STRING },
  },
  { timestamps: true }
);

module.exports = User;
