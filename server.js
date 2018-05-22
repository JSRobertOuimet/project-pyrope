const
  express = require("express"),
  passport = require("passport"),

  mongoURI = require("./config/credentials").mongoURI,
  connect = require("./config/connection"),

  register = require("./routes/auth/register"),
  signIn = require("./routes/auth/sign-in"),
  resetPassword = require("./routes/auth/reset-password"),
  profiles = require("./routes/profiles/profiles"),
  challenges = require("./routes/challenges/challenges"),

  app = express(),
  port = 5000;


// ------------------------------
// Database
// ------------------------------

connect(mongoURI);


// ------------------------------
// Middleware
// ------------------------------

// Express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport
app.use(passport.initialize());
require("./config/passport")(passport);


// ------------------------------
// Routes
// ------------------------------

// Auth
app.use("/auth/register", register);
app.use("/auth/sign-in", signIn);
app.use("/auth/reset-password", resetPassword);

// Profiles
app.use("/profiles", profiles);

// Challenges
app.use("/challenges", challenges);

app.listen(port, () => console.log(`Server listening on port ${port}...`));