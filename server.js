const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = require("./config/db");
const User = require("./models/usermodel");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  return res.status(200).send("<h1>welcome to pathpuja</h1>");
});

sequelize
  .authenticate()
  .then(() => {
    console.log("PostgreSQL connected successfully");
    return sequelize.sync();
  })
  .then(() => {
    console.log("Database synchronized successfully");
  })
  .catch((error) => {
    console.error("Unable to connect to PostgreSQL:", error);
  });

  app.use("/api/v1/test", require("./routes/authroutes"));


const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.bgBlack.green);
});
