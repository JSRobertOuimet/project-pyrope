const
  mongoose = require("mongoose"),
  Schema = mongoose.Schema,

  sessionSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    challengeId: {
      type: Schema.Types.ObjectId,
      ref: "challenge"
    },
    date: {
      type: Date,
      default: Date.now(),
      required: true
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