const
  express = require("express"),
  passport = require("passport"),

  mongoURI = require("./config/credentials").mongoURI,
  connect = require("./config/connection"),

  register = require("./routes/auth/register"),
  signIn = require("./routes/auth/sign-in"),
  reset = require("./routes/auth/reset"),
  profiles = require("./routes/browse/profiles"),
  dashboard = require("./routes/dashboard/dashboard"),
  account = require("./routes/account/account"),

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
app.use("/auth/reset", reset);

// Browse
app.use("/browse/profiles", profiles);

// Dashboard
app.use("/dashboard", dashboard);

// Account
app.use("/account", account);

app.listen(port, () => console.log(`Server listening on port ${port}...`));