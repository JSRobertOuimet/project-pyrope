const
  mongoose = require("mongoose"),
  Schema = mongoose.Schema,

  sessionSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    challengeId: {
      type: Schema.Types.ObjectId,
      ref: "Challenge"
    },
    date: {
      type: Date,
      default: Date.now
    },
    numberOfPagesRead: {
      type: Number,
      min: 1,
      required: true
    },
    notes: {
      type: String,
      maxlength: 5000,
      required: false
    }
  });

module.exports = mongoose.model("Session", sessionSchema);