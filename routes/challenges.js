const
  express = require("express"),
  router = express.Router(),
  passport = require("passport"),

  validate = require("../validation/validation"),
  messages = require("../messaging/messaging"),

  Challenge = require("../models/Challenge"),
  Session = require("../models/Session");

// @desc      GET signed in user’s challenges
// @access    Private
router
  .get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Challenge
      .find({ userId: req.user.id })
      .sort({ date: -1 })
      .then(challenges => {
        res.status(200).json(challenges);
      })
      .catch(err => console.log(err));
  });

// @desc      GET signed in user’s specific challenge
// @access    Private
router
  .get("/:challengeId", passport.authenticate("jwt", { session: false }), (req, res) => {
    Challenge
      .find({ userId: req.user.id })
      .then(challenges => {
        challenges.forEach(challenge => {
          if(challenge.id === req.params.challengeId) {
            res.status(200).json(challenge);
          }
        });
      })
      .catch(err => console.log(err));
  });

// @desc      POST challenge
// @access    Private
router
  .post("/create", passport.authenticate("jwt", { session: false }), (req, res) => {
    const errors = validate(req.body, "createChallenge");

    if(Object.keys(errors).length > 0) {
      res.status(400).json(errors);
    }

    const challenge = new Challenge({
      userId: req.user.id,
      book: {
        author: req.body.author,
        title: req.body.title,
        numberOfPages: req.body.bookNumberOfPages
      },
      goal: {
        numberOfPages: req.body.goalNumberOfPages,
        timePeriod: req.body.goalTimePeriod
      },
      public: req.body.publicChallenge
    });

    challenge
      .save()
      .then(challenge => {
        res.status(200).json({ message: messages.successCreatedChallenge, challenge });
      })
      .catch(err => console.log(err));
  });

// @desc      EDIT specific challenge (mark as "completed": true)
// @access    Private
router
  .post("/:challengeId", passport.authenticate("jwt", { session: false }), (req, res) => {
    Challenge
      .findOne({ _id: req.params.challengeId })
      .then(challenge => {
        challenge.completed = req.body.completed;
        challenge
          .save()
          .then(challenge => {
            res.status(200).json({ message: messages.successEditedChallenge, challenge });
          })
          .catch(err => console.log(err));
      })
      .catch(err => console.log(err));
  });

// @desc      DELETE signed in user’s specific challenge and related sessions
// @access    Private
router
  .delete("/:challengeId", passport.authenticate("jwt", { session: false }), (req, res) => {
    Challenge
      .find({ userId: req.user.id })
      .then(challenges => {
        challenges.forEach(challenge => {
          if(challenge.id === req.params.challengeId) {
            challenge
              .remove()
              .then(() => {
                Session
                  .find({ challengeId: req.params.challengeId })
                  .then(sessions => {
                    if(sessions.length === 0) {
                      res.status(200).json({ message: messages.successDeletedChallenge });
                    }
                    else {
                      sessions.forEach(session => {
                        session
                          .remove()
                          .then(() => {
                            res.status(200).json({ message: messages.successDeletedChallenge });
                          })
                          .catch(err => console.log(err));
                      });
                    }
                  })
                  .catch(err => console.log(err));
              })
              .catch(err => console.log(err));
          }
        });
      })
      .catch(err => console.log(err));
  });

// @desc      GET signed in user’s specific challenge’s sessions
// @access    Private
router
  .get("/:challengeId/sessions", passport.authenticate("jwt", { session: false }), (req, res) => {
    Session
      .find({ userId: req.user.id })
      .sort({ date: -1 })
      .then(sessions => {
        let currentChallengeSessions = [];

        sessions.forEach(session => {
          if(session.challengeId.toString() === req.params.challengeId) {
            currentChallengeSessions.push(session);
          }
        });

        res.status(200).json(currentChallengeSessions);
      })
      .catch(err => console.log(err));
  });

// @desc      POST session for a specific challenge
// @access    Private
router
  .post("/:challengeId/sessions", passport.authenticate("jwt", { session: false }), (req, res) => {
    const errors = validate(req.body, "createSession");

    if(Object.keys(errors).length > 0) {
      res.status(400).json(errors);
    }

    Challenge
      .find({ userId: req.user.id })
      .then(challenges => {
        challenges.forEach(challenge => {
          if(challenge.id === req.params.challengeId) {
            const session = new Session({
              userId: req.user.id,
              challengeId: req.params.challengeId,
              numberOfPagesRead: req.body.numberOfPagesRead,
              notes: req.body.notes
            });

            session
              .save()
              .then(session => {
                res.status(201).json({ message: messages.successCreatedSession, session });
              })
              .catch(err => console.log(err));
          }
        });
      })
      .catch(err => console.log(err));
  });

module.exports = router;