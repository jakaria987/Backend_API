const userModel = require("../model/signup.model");
const sentEmail = require("../utils/sendEmail");
const generateOTP = require("../utils/sendOtp");

const signupController = async (req, res, next) => {
  let { name, email, password, phone, image, role } = req.body;

  let otp = generateOTP();

  let user = new userModel({
    name,
    email,
    password,
    phone,
    image,
    role,
  });
  await user
    .save()
    .then(() => {
      sentEmail(email, otp);
      return res.status(201).json({
        success: true,
        message: "User created successfully",
        data: user,
      });
    })
    .catch((err) => {
      next(err);
    });
};
module.exports = signupController;
