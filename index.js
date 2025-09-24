const express = require("express");
require("dotenv").config();
const dbConnection = require("./src/config/dbConfig");
const router = require("./src/route");

const app = express();
const port = process.env.PORT || 4000;

// database connection
dbConnection();

// router middleware
app.use(router);

// http://localhost:3000

app.listen(port, () => {
  console.log(`server is running on port no ${port}`);
});
