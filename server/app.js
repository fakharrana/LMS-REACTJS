var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var adminRouter = require("./routes/admin");
var studentRouter = require("./routes/student");
var teacherRouter = require("./routes/teacher");
var headRouter = require("./routes/head");
var passport = require("passport");
var config = require("./config");
var cors = require("cors");
var authenticate = require("./authenticate");
var app = express();

//New
var assignmentsRouter = require("./routes/assignments");

//MongoDB Local URL
const DatabaseURL = "mongodb://localhost:27017/lms_react";

// Create MongoDB connection
mongoose.connect(
  DatabaseURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  function (err) {
    if (err) {
      console.log("There was a problem connecting to the Database!" + err);
    } else {
      console.log("Successfully Connected to Database");
    }
  }
);

app.use(passport.initialize());
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

//For Cross Origin Resource Sharing
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/head", headRouter);
app.use("/teacher", teacherRouter);
app.use("/admin", adminRouter);
app.use("/student", studentRouter);
app.use("/assignments", assignmentsRouter);

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
