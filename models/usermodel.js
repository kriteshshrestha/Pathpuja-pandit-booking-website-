const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },

  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
      type: DataTypes.STRING,
      required: [true, "phone no. is required"],
    },
    usertype: {
      type: DataTypes.STRING,
      required: [true, "user type is required"],
      default: "client",
      enum: ["client", "admin", "vendor", "driver"],
    },
    profile: {
      type: DataTypes.STRING,
      default:
        "https://www.google.com/imgres?q=user%20img&imgurl=https%3A%2F%2Fwww.citypng.com%2Fpublic%2Fuploads%2Fpreview%2Fhd-man-user-illustration-icon-transparent-png-701751694974843ybexneueic.png%3Fv%3D2026050810&imgrefurl=https%3A%2F%2Fwww.citypng.com%2Fsearch%3Fq%3Duser%2Bicon&docid=CewRESp_Btw1XM&tbnid=x2Wcu-bnVSzpFM&vet=12ahUKEwiin7i4s8eUAxVBSWwGHeeADIUQnPAOegQIHxAB..i&w=800&h=800&hcb=2&ved=2ahUKEwiin7i4s8eUAxVBSWwGHeeADIUQnPAOegQIHxAB",
    },
});

module.exports = User;
