const
  mongoose = require("mongoose"),
  Schema = mongoose.Schema,

  readingSessionSchema = new Schema({
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

module.exports = mongoose.model("ReadingSession", readingSessionSchema);