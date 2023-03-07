var express = require("express");
var router = express.Router();
const userModel = require("../models/userModel");
var passport = require("passport")
var notifire = require("node-notifier")
const localStrategy=require('passport-local').Strategy;
passport.use(new localStrategy(userModel.authenticate()));
/* GET home page. */

router.get("/", async function (req, res, next) {
  try {
    res.render("index");
  } catch (err) {
    return res.json(err);
  }
});

router.get('/home', async (req, res) => {
  try {
    res.render('home');
  } catch (error) {
    return res.json(err);
  }
})

router.get('/home2', async (req, res) => {
  try {
    res.render('home2');
  } catch (error) {
    return res.json(err);
  }
})

router.get('/signup', function(req, res, next) {
  res.render('register');
});

router.post("/register", async function (req, res, next) {
  try {
    if (!req.body.username || !req.body.email || !req.body.password) {
      new notifier.WindowsBalloon().notify({
        title: "",
        message: "Fill All the Fields",
      });
      return res.redirect("/signup");
    }

    const user = await userModel.findOne({ username: req.body.username });
    const userAgain = await userModel.findOne({ email: req.body.email });

    if (user) {
      notifier.notify({
        title: "",
        message: "User Already Exists with the given username",
      });
      return res.redirect("/signup");
    } else if (userAgain) {
      notifier.notify({
        title: "",
        message: "User Already Exists with the given email",
      });
      return res.redirect("/signup");
    } else {
      // res.render("verifyEmail", { SigningUser: req.body });
      var newUser = new userModel({
        username: req.body.username,
        email: req.body.email,
      });
      userModel
        .register(newUser, req.body.password)
        .then(function (registereduser) {
          passport.authenticate("local")(req, res, function () {
            console.log(registereduser)
            res.send(registereduser)
          });
        });
    }
  } catch (error) {
    res.redirect("/signup");
  }
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login' , passport.authenticate('local',{
  successRedirect: '/signup',
  failureRedirect : '/'
}))

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get("/check", async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  if (user) {
    res.redirect("/signup");
  } else {
    await userModel.create({
      username: req.user.given_name,
      email: req.user.email,
    });
    res.redirect("/signup");
  }
});

router.get(
  "/new/google/callback",
  passport.authenticate("google", {
    successRedirect: "/check",
    failureRedirect: "/auth/google/failure",
  })
);

router.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

router.get("/upload/video", async (req, res) => {});
module.exports = router;
