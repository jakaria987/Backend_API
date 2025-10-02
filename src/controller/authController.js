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
const verifyOtpController = async (req, res, next) => {
  let { email, otp } = req.body;
  let user = await userModel.findOne({ email });

  if (!user) {
    res.status(404).json({ success: false, message: "User not found" });
  } else {
    if (user.otp === otp) {
      let verify = await userModel.findOneAndUpdate(
        { email },
        { verify: true },
        { new: true }
      );
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
module.exports = { signupController, verifyOtpController };
