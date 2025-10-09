const userModel = require("../model/signup.model");
const sentEmail = require("../utils/sendEmail");
const generateOTP = require("../utils/sendOtp");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const signupController = async (req, res, next) => {
  let { name, email, password, phone, image, role } = req.body;

  let userFind = await userModel.findOne({ email });
  if (userFind) {
    res.status(500).json({ success: false, message: "User already exist" });
  } else {
    let otp = generateOTP();
    let user = new userModel({
      name,
      email,
      password,
      phone,
      image,
      role,
      otp,
    });
    await user
      .save()
      .then(() => {
        sentEmail(email, otp);

        // For remove otp that means otp will be null after 1 minute

        // setTimeout(async () => {
        //   let ForOtpRemove = await userModel.findOneAndUpdate(
        //     { email },
        //     { otp: null },
        //     { new: true }
        //   );
        //   await ForOtpRemove.save().then(() => {
        //     console.log("Removed OTP");
        //   });
        // }, 60000);

        let info = {
          name: user.name,
          email: user.email,
        };

        return res.status(201).json({
          success: true,
          message: "User created successfully",
          data: info,
        });
      })
      .catch((err) => {
        next(err);
      });
  }
};
const verifyOtpController = async (req, res, next) => {
  let { email, otp } = req.body;
  let user = await userModel.findOne({ email });

  if (!user) {
    res.status(404).json({ success: false, message: "User not found" });
  } else {
    if (user.otp === otp) {
      let verify = await userModel
        .findOneAndUpdate({ email }, { verify: true }, { new: true })
        .select("-password");
      return res.status(200).json({
        success: true,
        message: "Verified successfully",
        data: verify,
      });
    } else {
      res.status(404).json({ success: false, message: "OTP not matched" });
    }
  }
};
const loginController = async (req, res, next) => {
  let { email, password } = req.body;
  let user = await userModel.findOne({ email });

  if (!user) {
    res.status(404).json({ success: false, message: "Invalid Credential" });
  } else {
    bcrypt.compare(password, user.password, function (err, result) {
      if (result) {
        let token = jwt.sign(
          { email: user.email, role: user.role },
          process.env.PRIVATE_KEY,
          {
            expiresIn: "1m",
          }
        );

        res.status(200).json({
          success: true,
          message: "Log in Successfully",
          data: user,
          token,
        });
      } else {
        res.status(404).json({ success: false, message: "Invalid Credential" });
      }
    });
  }
};
const allUsersController = async (req, res, next) => {
  try {
    let allUsers = await userModel.find({}).select("-password");
    res.status(200).json({
      success: true,
      message: "All Users Fetch Successfully",
      data: allUsers,
    });
  } catch (error) {}
};
module.exports = {
  signupController,
  verifyOtpController,
  loginController,
  allUsersController,
};
