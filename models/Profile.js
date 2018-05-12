const
  mongoose = require("mongoose"),
  Schema = mongoose.Schema,

  profileSchema = new Schema({
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user"
    },
    username: {
      type: String,
      required: true
    },
    about: {
      type: String,
      required: false
    },
    challenges: {
      type: Array,
      required: false
    },
    friends: {
      type: Array,
      required: false
    },
    public: {
      type: Boolean,
      default: true,
      required: true
    }
  });

module.exports = mongoose.model("Profile", profileSchema);