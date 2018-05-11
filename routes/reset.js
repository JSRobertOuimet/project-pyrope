const
  express = require("express"),
  router = express.Router(),
  nodemailer = require("nodemailer"),

  testAccount = require("../config/credentials").testAccount,

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
      nodemailer.createTestAccount(() => {
        const transporter = nodemailer.createTransport({
          host: "smtp.ethereal.email",
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.password
          }
        });

        const config = {
          from: "'Project Pyrope' <info@project-pyrope.com>",
          to: `${req.body.email}`,
          subject: "Reset your Password",
          text: "Here's the link to reset your password!",
          html: "<p>Here's the link to reset your password!"
        };

        transporter.sendMail(config, error => {
          if(error) {
            console.log(error);
          }
          else {
            res
              .status(200)
              .json({ message: messages.successEmailSent });
          }
        });
      });
    }
  });

module.exports = router;