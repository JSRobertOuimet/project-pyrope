const
  express = require("express"),
  passport = require("passport"),

  mongoUri = require("./config/credentials").mongoUri,
  connect = require("./config/connection"),

  register = require("./routes/auth/register"),
  signIn = require("./routes/auth/sign-in"),
  reset = require("./routes/auth/reset"),
  profiles = require("./routes/browse/profiles"),
  profile = require("./routes/dashboard/profile"),
  account = require("./routes/account/account"),

  app = express(),
  port = 5000;


// ------------------------------
// Database
// ------------------------------

connect(mongoUri);


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
app.use("/auth/reset", reset);

// Browse
app.use("/browse/profiles", profiles);

// Dashboard
app.use("/browse/profile", profile);

// Account
app.use("/account", account);

app.listen(port, () => console.log(`Server listening on port ${port}...`));