const mongoose = require("mongoose"),

connect = uri =>
  mongoose
    .connect(uri)
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.log(err));

module.exports = connect;