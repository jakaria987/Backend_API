const errorHandlingMiddleware = (err, req, res, next) => {
  // return res
  //   .status(400)
  //   .send({ success: false, message: "Something went wrong" });

  if (err.name === "ValidationError") {
    let errors = {};
    Object.keys(err.errors).forEach((key) => {
      errors[key] = err.errors[key].message;
    });
    return res.status(400).send(errors)
  }
  // console.log(err.errors);
};

module.exports = errorHandlingMiddleware;
