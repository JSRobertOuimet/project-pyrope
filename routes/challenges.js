const
  express = require("express"),
  router = express.Router(),
  passport = require("passport"),

  messages = require("../messaging/messaging"),
  
  Challenge = require("../models/Challenge"),
  Session = require("../models/Session");

// @desc      GET signed in user’s challenges
// @access    Private
router
  .get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
    Challenge
      .find({ userId: req.user.id })
      .then(challenges => {
        res
          .status(200)
          .json(challenges);
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
            res
              .status(200)
              .json(challenge);
          }
        });
      })
      .catch(err => console.log(err));
  });

// @desc      POST challenge
// @access    Private
router
  .post("/create", passport.authenticate("jwt", { session: false }), (req, res) => {
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
      }
    });

    challenge
      .save()
      .then(challenge => {
        res
          .status(200)
          .json({ message: messages.successCreatedChallenge, challenge });
      });
  });

// @desc      DELETE signed in user’s specific challenge
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
                res
                  .status(200)
                  .json({ message: messages.successDeletedChallenge });
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
      .then(sessions => {
        let currentChallengeSessions = [];

        sessions.forEach(session => {
          if(session.challengeId.toString() === req.params.challengeId) {
            currentChallengeSessions.push(session);
          }
        });

        if(currentChallengeSessions.length === 0) {
          res
            .status(404)
            .json({ message: messages.errorNoSessionFound });
        }
        else {
          res
            .status(200)
            .json(currentChallengeSessions);
        }
      })
      .catch(err => console.log(err));
  });

// @desc      POST session for a specific challenge
// @access    Private
router
  .post("/:challengeId/sessions", passport.authenticate("jwt", { session: false }), (req, res) => {
    Challenge
      .find({ userId: req.user.id })
      .then(challenges => {
        challenges.forEach(challenge => {
          if (challenge.id === req.params.challengeId) {
            const session = new Session({
              userId: req.user.id,
              challengeId: req.params.challengeId,
              numberOfPagesRead: req.body.numberOfPagesRead,
              notes: req.body.notes
            });

            session
              .save()
              .then(session => {
                res
                  .status(201)
                  .json({ message: messages.successCreatedSession, session });
              })
              .catch(err => console.log(err));
          }
        });
      })
      .catch(err => console.log(err));
  });

module.exports = router;