const
  express = require("express"),
  router = express.Router(),
  nodemailer = require("nodemailer"),

  validateUserInputs = require("../validation/validation"),
  messages = require("../messaging/messaging"),

  User = require("../models/User");

router
  .post("/", (req, res) => {
    const errors = validateUserInputs(req.body, "resetPassword");

    if(Object.keys(errors).length > 0) {
      res
        .status(400)
        .json(errors);
    }
    else {
      User
        .findOne({ email: req.body.email })
        .then(user => {
          if(!user) {
            res
              .status(400)
              .json({ message: messages.errorNoProfileFound });
          }
          else {
            nodemailer.createTestAccount(() => {
              const transporter = nodemailer.createTransport({
                host: "smtp.ethereal.email",
                port: 587,
                secure: false,
                auth: {
                  user: "oz5snnmaycnreeym@ethereal.email",
                  pass: "ukGvc9xEcVaQ9xm2cR"
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
                  return console.log(error);
                }
                else {
                  res
                    .status(200)
                    .json({ message: messages.successEmailSent });
                }
              });
            });
          }
        })
        .catch(err => console.log(err));
    }
  });

module.exports = router;