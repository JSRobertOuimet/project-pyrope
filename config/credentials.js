if(process.env.NODE_ENV === "production") {
  module.exports = require("./credentials-prod");
}
else {
  module.exports = require("./credentials-dev");
}