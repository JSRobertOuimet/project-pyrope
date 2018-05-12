const
  express = require("express"),
  passport = require("passport"),

  mongoUri = require("./config/credentials").mongoUri,
  connect = require("./config/connection"),

  register = require("./routes/register"),
  signIn = require("./routes/sign-in"),
  reset = require("./routes/reset"),
  profiles = require("./routes/profiles"),

  app = express(),
  port = 5000;

// Database
connect(mongoUri);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport
app.use(passport.initialize());
require("./config/passport")(passport);

// Routes
app.use("/register", register);
app.use("/sign-in", signIn);
app.use("/reset", reset);
app.use("/profiles", profiles);

app.listen(port, () => console.log(`Server listening on port ${port}...`));