const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = require("../models/usermodel");
const Puja = require("../models/pujamodel");

const Booking = sequelize.define("Booking", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },

  panditId: {
  type: DataTypes.INTEGER,
  allowNull: true,
  references: {
    model: User,
    key: "id",
  },
},

  pujaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Puja,
      key: "id",
    },
  },

  bookingDate: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "pending",
    validate: {
      isIn: [["pending", "accepted", "rejected", "cancelled", "completed"]],
    },
  },
});

module.exports = Booking;