const
  mongoose = require("mongoose");

const connect = env => {
  let uri;

  switch(env) {
    case "local":
      uri = require("./credentials").mongoURI_local;
      break;
    case "remote":
      uri = require("./credentials").mongoURI_remote;
      break;
    default:
      console.log("The connection type must be \"local\" or \"remote\".");
      break;
  }

  mongoose
    .connect(uri)
    .then(() => console.log("Connected to MongoDB..."))
    .catch(err => console.log(err));
};

module.exports = connect;