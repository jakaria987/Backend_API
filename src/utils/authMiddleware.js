const jwt = require("jsonwebtoken");
let tokenCheckMiddleware = (req, res, next) => {
  let { token } = req.headers;

  try {
    jwt.verify(token, process.env.PRIVATE_KEY, function (err, decoded) {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      } else {
        req.userData = decoded;
        next();
      }
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
let adminCheck = (req, res, next) => {
  if (req.userData.role == "admin") {
    next();
  } else {
    res.status(400).json({ success: false, message: "Access Denied" });
  }
};
module.exports = { tokenCheckMiddleware, adminCheck };
