const
  mongoose = require("mongoose"),
  Schema = mongoose.Schema,

  challengeSchema = new Schema({
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
        required: true
      }
    },
    readingGoal: {
      numberOfPages: {
        type: Number,
        required: true
      },
      timePeriod: {
        type: String,
        required: true
      }
    },
    readingSessions: {
      type: Array,
      required: false
    },
    public: {
      type: Boolean,
      default: true,
      required: true
    }
  });

module.exports = mongoose.model("Challenge", challengeSchema);