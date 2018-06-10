const
  mongoose = require("mongoose"),
  Schema = mongoose.Schema,

  userSchema = new Schema({
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    registrationDate: {
      type: Date,
      default: Date.now
    }
  });

module.exports = mongoose.model("User", userSchema);