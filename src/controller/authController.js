const userModel = require("../model/signup.model");

const signupController = async (req, res, next) => {
  let { name, email, password, phone, image, role } = req.body;
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
