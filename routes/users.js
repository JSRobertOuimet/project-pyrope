const
  express = require("express"),
  router = express.Router(),

  User = require("../models/User");

// ==============================
// GET requests

// Get all users (public)
router.get("/", (req, res) => {
  User
    .find()
    .then(users => res.json(users));
});

// Get specific user with username
router.get("/:username", (req, res) => {
  res.send(`User with id ${req.params.username}...`);
});

module.exports = router;