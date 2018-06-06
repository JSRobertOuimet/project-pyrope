const
  express = require("express"),
  passport = require("passport"),

  connect = require("./config/connection"),

  auth = require("./routes/auth"),
  profiles = require("./routes/profiles"),
  challenges = require("./routes/challenges"),

  app = express(),
  port = 5000;

// MongoDB
connect("remote");

// Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport
app.use(passport.initialize());
require("./config/passport")(passport);

// Routes
app.use("/auth", auth);
app.use("/profiles", profiles);
app.use("/challenges", challenges);

app.listen(port, () => console.log(`Server listening on port ${port}...`));