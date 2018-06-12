const
  mongoose = require("mongoose"),
  Schema = mongoose.Schema,

  challengeSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    book: {
      author: {
        type: String,
        required: true
      },
      title: {
        type: String,
        required: true,
      },
      numberOfPages: {
        type: Number,
        min: 1,
        required: true
      }
    },
    goal: {
      numberOfPages: {
        type: Number,
        min: 1,
        required: true
      },
      timePeriod: {
        type: String,
        required: true
      }
    },
    completed: {
      type: Boolean,
      default: false
    },
    public: {
      type: Boolean,
      default: true
    },
    date: {
      type: Date,
      default: Date.now
    },
  });

module.exports = mongoose.model("Challenge", challengeSchema);