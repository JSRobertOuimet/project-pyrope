const
  express = require("express"),
  passport = require("passport"),

  mongoURI = require("./config/credentials").mongoURI,
  connect = require("./config/connection"),

  register = require("./routes/register"),
  login = require("./routes/login"),
  reset = require("./routes/reset"),
  users = require("./routes/users"),
  profiles = require("./routes/profiles"),

  app = express(),
  port = 5000;

// Database
connect(mongoURI);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Passport
app.use(passport.initialize());
require("./config/passport")(passport);

// Routes
app.use("/register", register);
app.use("/login", login);
app.use("/reset", reset);
app.use("/users", users);
app.use("/profiles", profiles);

app.listen(port, () => console.log(`Server listening on port ${port}...`));