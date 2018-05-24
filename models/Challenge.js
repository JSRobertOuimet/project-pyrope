const
  mongoose = require("mongoose"),
  Schema = mongoose.Schema,

  challengeSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user"
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
        required: true
      }
    },
    goal: {
      numberOfPages: {
        type: Number,
        required: true
      },
      timePeriod: {
        type: String,
        required: true
      }
    },
    sessions: {
      type: Array,
      required: true
    },
    completed: {
      type: Boolean,
      default: false,
      required: true
    },
    public: {
      type: Boolean,
      default: true,
      required: true
    }
  });

module.exports = mongoose.model("Challenge", challengeSchema);