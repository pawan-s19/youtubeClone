var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

const cloudinary = require("cloudinary");

var expressSession = require("express-session");


var indexRouter = require("./routes/index");
var usersRouter = require("./models/userModel");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

const GOOGLE_CLIENT_ID =
  "878196794158-vcb4b4spdjdk39ofgui12uqquoir6pl8.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const { connectDB } = require("./utils/db");

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/new/google/callback",
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);

passport.serializeUser(function (user, done) {
  // console.log(user)
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  // console.log(user)
  done(null, user);
});
//connecting to cloudinary

cloudinary.config({
  cloud_name: "dy9xqzsbx",
  api_key: "464422387612173",
  api_secret: "tsVokf_Q6IwHnRAQz7POgvrxLHg",
  secure: true,
});

//connect to database
connectDB();

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  expressSession({
    resave: false,
    saveUninitialized: false,
    secret: "humara app",
  })
);
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(usersRouter.serializeUser());
passport.deserializeUser(usersRouter.deserializeUser());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

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
