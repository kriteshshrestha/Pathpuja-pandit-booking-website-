const { compare } = require("bcrypt");
const JWT = require("jsonwebtoken");
const usermodel = require("../models/usermodel");

const registercontroller = async (req, res) => {
  try {
    const { username, email, password, address, phone, usertype } = req.body;
    if (!username || !email || !password || !address || !phone) {
      return res.status(500).send({
        success: false,
        message: "please provide all the fields",
      });
    }

    const existing = await usermodel.findOne({
      where: { email },
    });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "the user already exist",
      });
    }
    const role = usertype == "pandit" ? "pandit" : "user";

    const user = await usermodel.create({
      username,
      email,
      password,
      address,
      phone,
      usertype: role,
    });

    res.status(201).send({
      success: true,
      message: "user created successfully",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in user register api",
      error,
    });
  }
};

const logincontroller = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "enter all the fields",
      });
    }
    const user = await usermodel.findOne({
      where: { email: email },
    });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }

    const ismatch = password == user.password;
    if (!ismatch) {
      return res.status(500).send({
        success: false,
        message: "invalid credentials",
      });
    }

    const token = JWT.sign(
      { id: user.id, usertype: user.usertype },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      },
    );

    res.status(200).send({
      success: true,
      message: "login successful",
      user,
      token,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in login api",
    });
  }
};

module.exports = { registercontroller, logincontroller };
