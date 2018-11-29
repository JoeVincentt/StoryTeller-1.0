const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");

//Load User model
require("./models/User");

//Passport config
require("./config/passport")(passport);

//Load routes
const auth = require("./routes/auth");
const index = require("./routes/index");

//Load keys
const keys = require("./config/keys");

//Map global promises
mongoose.Promise = global.Promise;

//Mongoose connect
mongoose
  .connect(
    keys.mongoURI,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const app = express();

//HandleBars Middleware
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

//Express middleware/ cookie-parser midle
app.use(cookieParser());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false
  })
);

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

//SET GLOBAL VARS
app.use((req, res, next) => {
  res.locals.user = req.user || null;
  next();
});

//Use Routes
app.use("/", index);
app.use("/auth", auth);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
