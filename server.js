const
  path = require("path"),
  express = require("express"),
  passport = require("passport"),

  connect = require("./config/connection"),

  auth = require("./routes/auth"),
  profiles = require("./routes/profiles"),
  challenges = require("./routes/challenges"),
  sessions = require("./routes/sessions"),

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

// Routes (Development)
app.use("/auth", auth);
app.use("/profiles", profiles);
app.use("/challenges", challenges);
app.use("/sessions", sessions);

// Routes (Production)
if(process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => console.log(`Server listening on port ${port}...`));