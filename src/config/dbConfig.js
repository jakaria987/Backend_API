const { default: mongoose } = require("mongoose");

const dbConnection = () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.y1ht8ob.mongodb.net/${process.env.DB_USER}?retryWrites=true&w=majority&appName=Cluster0`
    )
    .then(() => {
      console.log("Database connected perfectly");
    })
    .catch((err) => {
      console.log(err.message || "Connection Failed");
    });
};
module.exports = dbConnection;
