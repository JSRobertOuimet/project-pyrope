const
  express = require("express"),
  router = express.Router(),
  sg = require("@sendgrid/mail"),

  sgAPIKey = require("../config/credentials").sgAPIKey,

  validateUserInputs = require("../validation/validation"),
  messages = require("../messaging/messaging");

router
  .post("/", (req, res) => {
    const errors = validateUserInputs(req.body, "resetPassword");

    if(Object.keys(errors).length > 0) {
      res
        .status(400)
        .json(errors);
    }
    else {
      sg.setApiKey(sgAPIKey);
      const msg = {
        to: `${req.body.email}`,
        from: "reset@project-pyrope.com",
        subject: "Reset Password",
        text: "Here's the link to reset your password!",
        html: "<p>Here's the link to reset your password!"
      };

      sg.send(msg);

      res
        .status(200)
        .json({ message: messages.successEmailSent });
    }
  });

module.exports = router;