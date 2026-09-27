const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
const path = require("path");

const sequelize = require("./config/db");
const User = require("./models/usermodel");
require("./models/association");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

const frontendPath = path.join(
  __dirname,
  "..",
  "pathpuja-frontend"
);

app.use(express.static(frontendPath));

app.get("/", (req, res) => {
  res.sendFile(
    path.join(frontendPath, "html", "index.html")
  );
});

sequelize
  .authenticate()
  .then(() => {
    console.log("PostgreSQL connected successfully");
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    console.log("Database synchronized successfully");
  })
  .catch((error) => {
    console.error("Unable to connect to PostgreSQL:", error);
  });

app.use("/api/v1/auth", require("./routes/authroutes"));
app.use("/api/v1/puja", require("./routes/pujaroutes"));
app.use("/api/v1/booking", require("./routes/bookingroutes"));
app.use("/api/v1/pandit", require("./routes/panditroutes"));

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`.bgBlack.green);
});
