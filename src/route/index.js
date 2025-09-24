const express = require("express");
const router = express.Router();

const api = require("./api");

router.use(process.env.BASE_URL, api);

// http://localhost:3000/api/v1

module.exports = router;
