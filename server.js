const
  express = require("express"),

  mongoURI = require("./config/credentials").mongoURI,
  connect = require("./config/connection"),

  register = require("./routes/register"),
  login = require("./routes/login"),
  users = require("./routes/users"),

  app = express(),
  port = 5000;

// Database
connect(mongoURI);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/register", register);
// app.use("/login", login);
app.use("/users", users);

app.listen(port, () => console.log(`Server listening on port ${port}...`));