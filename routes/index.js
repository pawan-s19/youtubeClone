var express = require("express");
var router = express.Router();
const userModel = require("../models/userModel");
const videoModel = require("../models/videoModels");
var passport = require("passport");
var notifier = require("node-notifier");
const { upload } = require("../utils/upload");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const formidable = require("formidable");
const moment = require("moment");
const channelModel = require('../models/channelModel')
const localStrategy=require('passport-local');
const { json } = require("express");
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
   try{
    // let user = await userModel.findOne({_id:req.session.passport.user._id})
    // res.render("index",{user:user});
    let user = req.session.passport?.user
    res.render('index', {user})
   }
   catch(err){
    res.send(err)
   }
  
});

router.get("/home", async (req, res) => {
  try{
    // let user = await userModel.findOne({_id:req.session.passport.user._id})
   // res.render("index",{user:user});
   let user = req.session.passport?.user
   res.render('videoPlayer', {user})
  }
  catch(err){
   res.send(err)
  }
});

router.get("/home2", async (req, res) => {
  try{
    // let user = await userModel.findOne({_id:req.session.passport.user._id})
   // res.render("index",{user:user});
   let user = req.session.passport?.user
   res.render('home2', {user})
  }
  catch(err){
   res.send(err)
  }
});

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
        name : req.body.name
      });
      userModel
        .register(newUser, req.body.password)
        .then(function (registereduser) {
          passport.authenticate("local")(req, res, function () {
            console.log(registereduser)
            res.redirect('/')
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

router.post('/login' , passport.authenticate('local',{
  successRedirect: '/',
  failureRedirect : '/404'
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

router.post("/upload/video", upload().single("file"), async (req, res) => {
  try {
    let video = await videoModel.create({
      video_id: req.file.id,
    });
    // if (
    //   fileContent == "video/mp4" ||
    //   fileContent == "video/x-ms-wmv" ||
    //   fileContent == "video/x-matroska"
    // ) {
    //   res.status(201).json({ text: "File uploaded successfully !" });
    // } else {
    //   res.json({ message: "sorry ! Invalid mime type !!" });
    // }
    res.redirect(`/redirect/video/dets/${video._id}`);
  } catch (error) {
    res.status(400).json({
      error: { text: "Unable to upload the file", error },
    });
  }
});

router.get("/redirect/video/dets/:id", async (req, res, next) => {
  let video = await videoModel.findOne({ _id: req.params.id });
  res.render("uploadPageSecond", {
    id: req.params.id,
    vidGridFs: video.video_id,
  });
});

router.post("/upload/video/dets/:id", async (req, res, next) => {
  const form = formidable({ multiples: true });

  form.parse(req, async (err, fields, files) => {
    console.log(fields);
    const { title, description, status } = fields;
    const { secure_url, public_id } = await cloudinary.v2.uploader.upload(
      files.thumbnail.filepath,
      {
        folder: `youtubethumbnails`,
        fetch_format: "webp",
      }
    );
    await videoModel.findOneAndUpdate(
      { _id: req.params.id },
      {
        title,
        description,
        status,
        thumbnail: { secure_url, public_id },
      }
    );
  });
  res.redirect("/uploadPage");
});
router.get("/videos", async (req, res, next) => {
  const videos = await videoModel.find({});
  res.render("videos", { videos, moment });
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

router.post("/createChannel" , async function(req,res){
  let user = await userModel.findOne({_id: req.session.passport.user._id})
  channelModel.create({
    channelName : req.body.cname,
    username : req.body.username,
    channelOwner : user._id
  })
  .then(function(createdChannel){
    user.channel=createdChannel._id;
    user.save()
    .then(function(updatedUser){
      res.send(updatedUser)
    })
  })
})


router.get("/upload/video", async (req, res) => {});
module.exports = router;
