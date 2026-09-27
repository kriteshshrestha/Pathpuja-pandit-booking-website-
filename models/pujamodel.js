const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Puja = sequelize.define("Puja", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },

  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "active",
    validate: {
      isIn: [["active", "inactive"]],
    },
  },
});

module.exports = Puja;