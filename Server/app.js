const express = require("express");
const cors = require("cors");
const routes = require("./router");
const sequelize = require("./config");

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api", routes);

const startServer = async () => {
  try {
    await sequelize.sync();
    console.log("Database connected");

    app.listen(5000, () => {
      console.log("Server is running on port 5000");
    });
  } catch (error) {
    console.error("Db Connection Lost:", error);
  }
};

startServer();
