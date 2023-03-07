var express = require("express");
var router = express.Router();
const userModel = require("../models/userModel");
var passport = require("passport");
var notifire = require("node-notifier");
const { upload } = require("../utils/upload");
const mongoose = require("mongoose");
const localStrategy = require("passport-local").Strategy;
passport.use(new localStrategy(userModel.authenticate()));

//initializing bucket for gridfs
let bucket;
(() => {
  mongoose.connection.on("connected", () => {
    bucket = new mongoose.mongo.GridFSBucket(mongoose.connection.db, {
      bucketName: "uploads",
    });
  });
})();

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

router.get("/signup", function (req, res, next) {
  res.render("register");
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
            console.log(registereduser);
            res.send(registereduser);
          });
        });
    }
  } catch (error) {
    res.redirect("/signup");
  }
});

router.get("/login", function (req, res, next) {
  res.render("login");
});

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/signup",
    failureRedirect: "/",
  })
);

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

router.post("/upload/video", upload().single("file"), async (req, res) => {
  try {
    // const fileContent = req.file.contentType;
    // if (
    //   fileContent == "video/mp4" ||
    //   fileContent == "video/x-ms-wmv" ||
    //   fileContent == "video/x-matroska"
    // ) {
    //   res.status(201).json({ text: "File uploaded successfully !" });
    // } else {
    //   res.json({ message: "sorry ! Invalid mime type !!" });
    // }
    res.status(201).json({ message: "file uploaded successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      error: { text: "Unable to upload the file", error },
    });
  }
});

router.get("/videos", async (req, res, next) => {
  const videos = await bucket.find({}).toArray();
  res.render("videos", { videos });
});

router.get("/single/:id", async (req, res, next) => {
  const video = await bucket
    .find({
      _id: new mongoose.Types.ObjectId(req.params.id),
    })
    .toArray();
  res.render("single", {
    path: `/play/${req.params.id}`,
    videoName: video[0].filename,
  });
});

router.get("/play/:id", async (req, res) => {
  const video = await bucket
    .find({
      _id: new mongoose.Types.ObjectId(req.params.id),
    })
    .toArray();
  // create a stream to read from the bucket
  const readStream = bucket.openDownloadStream(video[0]._id);

  // pipe the stream to the response
  readStream.pipe(res);
});

router.get("/uploadPage", (req, res, next) => {
  res.render("uploadPage");
});

module.exports = router;
