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
const channelModel = require("../models/channelModel");
const localStrategy = require("passport-local");
const { json } = require("express");
const commentModel = require("../models/commentModel");
const userplaylistModel = require("../models/userPlayListModel");
const notificationModel = require("../models/notificationModel");
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
    const videos = await videoModel
      .find({ status: "public" })
      .populate({ path: "userId", populate: { path: "channel" } });
    let LoggedInUser;
    if (req.session.passport?.user) {
      LoggedInUser = await userModel
        .findOne({
          _id: req.session.passport.user._id,
        })
        .populate({
          path: "notifications",
          populate: { path: "userId channelId videoId" },
        })
        .populate("userPlaylist");
    }
    res.render("home2", { user: LoggedInUser, videos, moment });
  } catch (err) {
    res.send(err);
  }
});

router.get("/home2", async (req, res) => {
  try {
    // let user = await userModel.findOne({_id:req.session.passport.user._id})
    // res.render("index",{user:user});
    const videos = await videoModel
      .find({})
      .populate({ path: "userId", populate: { path: "channel" } });

    let user = await userModel
      .findOne({ _id: req.session.passport.user._id })
      .populate({
        path: "notifications",
        populate: { path: "userId channelId videoId" },
      });
    console.log(user);
    res.render("home2", { user, videos, moment });
  } catch (err) {
    res.send(err);
  }
});

router.get("/signup", function (req, res, next) {
  res.render("register");
});

router.post("/register", async function (req, res, next) {
  try {
    if (!req.body.username || !req.body.email || !req.body.password) {
      new notifire.WindowsBalloon().notify({
        title: "",
        message: "Fill All the Fields",
      });
      return res.redirect("/signup");
    }

    const user = await userModel.findOne({ username: req.body.username });
    const userAgain = await userModel.findOne({ email: req.body.email });

    if (user) {
      notifire.notify({
        title: "",
        message: "User Already Exists with the given username",
      });
      return res.redirect("/signup");
    } else if (userAgain) {
      notifire.notify({
        title: "",
        message: "User Already Exists with the given email",
      });
      return res.redirect("/signup");
    } else {
      // res.render("verifyEmail", { SigningUser: req.body });
      var newUser = new userModel({
        username: req.body.username,
        email: req.body.email,
        name: req.body.name,
      });
      userModel
        .register(newUser, req.body.password)
        .then(function (registereduser) {
          passport.authenticate("local")(req, res, function () {
            console.log(registereduser);
            res.redirect("/");
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
    successRedirect: "/",
    failureRedirect: "/404",
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
  try {
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
  } catch (err) {
    res.send(err);
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

function formatBytes(bytes, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

router.post("/upload/video", upload().single("file"), async (req, res) => {
  try {
    let video = await videoModel.create({
      video_id: req.file.id,
      userId: req.session.passport.user._id,
    });

    let size = formatBytes(req.file.size);
    // if (
    //   fileContent == "video/mp4" ||
    //   fileContent == "video/x-ms-wmv" ||
    //   fileContent == "video/x-matroska"
    // ) {
    //   res.status(201).json({ text: "File uploaded successfully !" });
    // } else {
    //   res.json({ message: "sorry ! Invalid mime type !!" });
    // }
    res.redirect(
      `/redirect/video/dets/${video._id}/${req.file.originalname}/${size}/${req.file.mimetype.split("/")[1]
      }`
    );
  } catch (error) {
    res.status(400).json({
      error: { text: "Unable to upload the file", error },
    });
  }
});

router.get(
  "/redirect/video/dets/:id/:filename/:filesize/:filetype",
  isLoggedIn,
  hasChannel,
  async (req, res, next) => {
    try {
      let video = await videoModel.findOne({ _id: req.params.id });
      res.render("videoUploadDetails", {
        id: req.params.id,
        vidGridFs: video.video_id,
        filename: req.params.filename,
        filesize: req.params.filesize,
        filetype: req.params.filetype,
      });
    } catch (err) {
      res.send(err);
    }
  }
);

router.post(
  "/upload/video/dets/:id",
  isLoggedIn,
  hasChannel,
  async (req, res, next) => {
    try {
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

        let user = await userModel
          .findOne({ _id: req.session.passport.user._id })
          .populate({
            path: "channel",
            populate: { path: "channelSubscription" },
          });
        console.log(user);
        user.channel.channelSubscription.forEach(async function (elem) {
          let notification = await notificationModel.create({
            userId: elem._id,
            channelId: user.channel._id,
            videoId: req.params.id,
          });
          elem.notifications.unshift(notification._id);
          await elem.save();
        });
      });
      res.redirect("/");
    } catch (err) {
      res.send(err);
    }
  }
);

router.get("/watch/:id", async (req, res, next) => {
  try {
    // clicked video
    let video = await videoModel
      .findOne({ _id: req.params.id })
      .populate("comment")
      .populate({ path: "userId", populate: { path: "channel" } });

    // all videos
    const videos = await videoModel
      .find({})
      .populate({ path: "userId", populate: { path: "channel" } });
    // if (req.session.passport?.user) {
    //   let userId = req.session.passport.user._id;

    //   if (video.views.indexOf(userId) == -1) {
    //     video.views.push(userId);
    //   }
    // }
    let LoggedInUser;
    // logged in user
    if (req.session.passport?.user) {
      LoggedInUser = await userModel
        .findOne({
          _id: req.session.passport.user._id,
        })
        .populate({
          path: "notifications",
          populate: { path: "userId channelId videoId" },
        });
      let notificationToRemove = await notificationModel.findOne({
        videoId: video._id,
      });
      if (notificationToRemove) {
        await userModel.updateOne(
          { _id: LoggedInUser._id },
          { $pull: { notifications: { $eq: notificationToRemove._id } } }
        );
      }
      let userId = req.session.passport.user._id;

      if (video.views.indexOf(userId) == -1) {
        video.views.push(userId);
      }
    }
    await video.save();

    res.render("videoPlayer", { video, videos, user: LoggedInUser, moment });
  } catch (err) {
    res.send(err);
  }
});

router.get("/play/:id", async (req, res) => {
  try {
    const video = await bucket
      .find({
        _id: new mongoose.Types.ObjectId(req.params.id),
      })
      .toArray();
    // create a stream to read from the bucket
    const readStream = bucket.openDownloadStream(video[0]._id);

    // pipe the stream to the response
    readStream.pipe(res);
  } catch (err) {
    res.send(err);
  }
});

router.get("/like/:id", isLoggedIn, async (req, res, next) => {
  try {
    let video = await videoModel.findOne({ _id: req.params.id });
    let userId = await userModel.findOne({_id:req.session.passport.user._id});
    if (video.likes.indexOf(userId._id) !== -1) {
      //if user has already liked the video
      video.likes.splice(video.likes.indexOf(userId._id), 1);
      userId.likedVideos.splice(userId.likedVideos.indexOf(video._id),1)
    } else if (video.disLikes.indexOf(userId._id) !== -1) {
      //if user has disliked the video
      video.disLikes.splice(video.disLikes.indexOf(userId._id), 1);
      video.likes.push(userId._id);
      userId.likedVideos.push(userId._id)
    } else {
      //if user has not liked nor disliked the video
      video.likes.push(userId._id);
      userId.likedVideos.push(video._id)
    }
    await video.save();
    await userId.save();
    res.redirect(req.headers.referer);
  } catch (err) {
    res.send(err);
  }
});

router.get("/dislike/:id", isLoggedIn, async (req, res) => {
  try {
    let video = await videoModel.findOne({ _id: req.params.id });
    let userId = await userModel.findOne({_id:req.session.passport.user._id});
    if (video.disLikes.indexOf(userId._id) !== -1) {
      //if user has already disliked
      video.disLikes.splice(video.disLikes.indexOf(userId._id), 1);
    } else if (video.likes.indexOf(userId._id) !== -1) {
      //if user has liked the video
      video.likes.splice(video.likes.indexOf(userId._id), 1);
      video.disLikes.push(userId._id);
      userId.likedVideos.splice(userId.likedVideos.indexOf(video._id),1)
    } else {
      //if user has not disliked nor liked
      video.disLikes.push(userId._id);
    }
    await video.save();
    await userId.save();
    res.redirect(req.headers.referer);
  } catch (err) {
    res.send(err);
  }
});

router.get("/uploadPage", isLoggedIn, hasChannel, (req, res, next) => {
  res.render("uploadPage");
});

router.post("/comment/:id", isLoggedIn, async function (req, res) {
  try {
    let user = await userModel.findOne({ _id: req.session.passport.user._id });
    let comment = await commentModel.create({
      comment: req.body.comment,
      userId: user._id,
      name: req.session.passport.user.name,
    });
    let video = await videoModel.findOne({ _id: req.params.id });
    video.comment.push(comment._id);
    video.save();
    res.redirect(req.headers.referer);
  } catch (error) {
    res.send(error);
  }
});

router.get("/comment/like/:id", isLoggedIn, async function (req, res) {
  try {
    let comment = await commentModel.findOne({ _id: req.params.id });
    let userId = req.session.passport.user._id;
    if (comment.likes.indexOf(userId) !== -1) {
      //if user has already liked the comment
      comment.likes.splice(comment.likes.indexOf(userId), 1);
    } else if (comment.disLikes.indexOf(userId) !== -1) {
      //if user has disliked the comment
      comment.disLikes.splice(comment.disLikes.indexOf(userId), 1);
      comment.likes.push(userId);
    } else {
      //if user has not liked nor disliked the comment
      comment.likes.push(userId);
    }
    await comment.save();
    res.redirect(req.headers.referer);
  } catch (err) {
    res.send(err);
  }
});

router.get("/comment/dislike/:id", isLoggedIn, async function (req, res) {
  try {
    let comment = await commentModel.findOne({ _id: req.params.id });
    let userId = req.session.passport.user._id;
    if (comment.disLikes.indexOf(userId) !== -1) {
      //if user has already disliked
      comment.disLikes.splice(comment.disLikes.indexOf(userId), 1);
    } else if (comment.likes.indexOf(userId) !== -1) {
      //if user has liked the comment
      comment.likes.splice(comment.likes.indexOf(userId), 1);
      comment.disLikes.push(userId);
    } else {
      //if user has not disliked nor liked
      comment.disLikes.push(userId);
    }
    await comment.save();
    res.redirect(req.headers.referer);
  } catch (err) {
    res.send(err);
  }
});

router.post("/createChannel", async function (req, res) {
  try {
    let user = await userModel.findOne({ _id: req.session.passport.user._id });
    if (!user.channel) {
      channelModel
        .create({
          channelName: req.body.cname,
          username: req.body.username,
          channelOwner: user._id,
        })
        .then(function (createdChannel) {
          user.channel = createdChannel._id;
          user
            .save()

            .then(function (updatedUser) {
              console.log(user);
              return res.redirect("/");
            });
        });
    } else {
      return res.redirect("/");
    }
  } catch (err) {
    res.send(err);
  }
});

function isLoggedIn(req, res, next) {
  // req.user ? next() : res.sendStatus(401);
  if (req.isAuthenticated() || req.user) {
    return next();
  } else {
    res.redirect("/signInPage");
  }
}

async function hasChannel(req, res, next) {
  let user = await userModel.findOne({ _id: req.session.passport.user._id });
  if (user.channel) {
    return next();
  } else {
    res.redirect("/");
  }
}
router.get("/subscribe", (req, res, next) => {
  try {
    channelModel
      .find()
      .populate("channelOwner")
      .then(function (channel) {
        return res.render("subscribePage", { dets: channel });
      });
  } catch (err) {
    res.send(err);
  }
});

router.get("/subscribe/:id", function (req, res) {
  try {
    userModel.findOne({ username: req.session.passport.user.username })
      .then(function (user) {
        channelModel.findOne({ _id: req.params.id })
          .then(function (channeltobesubscribe) {
            let index = channeltobesubscribe.channelSubscription.indexOf(
              user._id
            );
            if (index === -1) {
              channeltobesubscribe.channelSubscription.push(user._id);
              user.channelSubscribeByUser.push(channeltobesubscribe._id)
              user.save();
              console.log("pushuser");
            } else {
              console.log("removeuser");
              channeltobesubscribe.channelSubscription.splice(index, 1);
              user.channelSubscribeByUser.splice(index, 1)
              user.save()
            }
            channeltobesubscribe.save().then(function () {
              res.redirect("/subscribe");
            });
          });
      });
  } catch (err) {
    res.send(err);
  }
});

router.get("/channel/:id/:section", async function (req, res) {
  try {
    // let user = await userModel.findOne({_id:req.session.passport.user._id})
    // res.render("index",{user:user});
    const videos = await videoModel
      .find({})
      .populate({ path: "userId", populate: { path: "channel" } });
    let user = req.session.passport?.user;
    res.render("channelPage", { user, videos, moment, section: req.params.section });
  } catch (err) {
    res.send(err);
  }
});

router.get("/addToWatchLater/:id", async function (req, res) {
  try {
    let user = await userModel.findOne({ _id: req.session.passport.user._id });
    if (user.watchLater.indexOf(req.params.id) === -1) {
      user.watchLater.push(req.params.id);
      user.save();
    }
    res.redirect("/");
  } catch (error) {
    res.send(error);
  }
});

router.get("/search", async (req, res) => {
  try {
    let LoggedInUser;
    let contentType = req.query.contentType;

    if (req.session.passport?.user) {
      LoggedInUser = await userModel
        .findOne({
          _id: req.session.passport.user._id,
        })
        .populate({
          path: "notifications",
          populate: { path: "userId channelId videoId" },
        }).populate({
          path : 'watchLater',
          populate : {
            path : 'userId',
            populate: 'channel'
          }
        });
    }

    if (contentType === "search") {
      let searchQuery = req.query.keyword;

      const videos = await videoModel
        .find({})
        .populate({ path: "userId", populate: { path: "channel" } });
      return res.render("searchResult", { user: LoggedInUser, videos, moment });
    } else if (contentType === "history") {
      if (!LoggedInUser) {
        return res.redirect("/signInPage");
      }

      const videos = await videoModel
        .find({})
        .populate({ path: "userId", populate: { path: "channel" } });
      // return res.send(videos)
      return res.render("searchResult", { user: LoggedInUser, videos, moment });
    } else if (contentType === "watchlater") {
      if (!LoggedInUser) {
        return res.redirect("/signInPage");
      }

      return res.render("searchResult", {
        user: LoggedInUser,
        videos: LoggedInUser?.watchLater,
        moment
      });
      // res.send(LoggedInUser.watchLater);
    } else if (contentType === "likedvideos") {
      if (!LoggedInUser) {
        return res.redirect("/signInPage");
      }
    } else {
      return res.send("you are lost");
    }
  } catch (err) {
    res.send(err);
  }
});

router.get("/signInPage", async (req, res) => {
  try {
    const videos = await videoModel
      .find({})
      .populate({ path: "userId", populate: { path: "channel" } });
    let LoggedInUser;
    if (req.session.passport?.user) {
      LoggedInUser = await userModel
        .findOne({
          _id: req.session.passport.user._id,
        })
        .populate({
          path: "notifications",
          populate: { path: "userId channelId videoId" },
        });
    }
    res.render("signInPage", { user: LoggedInUser, videos, moment });
  } catch (err) {
    res.send(err);
  }
});

router.post("/createplaylist/:id", isLoggedIn, async function (req, res) {
  try {
    let user = await userModel.findOne({ _id: req.session.passport.user._id });
    let playlist = await userplaylistModel.create({
      playListName: req.body.playListname,
      creater: user._id,
      videos: req.params.id,
    });
    user.userPlaylist.push(playlist._id);
    user.save();
    res.redirect("/");
  } catch (error) {
    res.send(error);
  }
});

router.get("/addToPlaylist/:plid/:id", async function (req, res) {
  try {
    let playlist = await userplaylistModel.findOne({ _id: req.params.plid });
    if (playlist.videos.indexOf(req.params.id) === -1) {
      playlist.videos.push(req.params.id);
      playlist.save();
    }
    res.redirect("/");
  } catch (error) {
    res.send(error);
  }
});

router.get("/feed/history", async function (req, res) {
  try {
    const videos = await videoModel
      .find({})
      .populate({ path: "userId", populate: { path: "channel" } });
    let LoggedInUser;
    if (req.session.passport?.user) {
      LoggedInUser = await userModel
        .findOne({
          _id: req.session.passport.user._id,
        })
        .populate({
          path: "notifications",
          populate: { path: "userId channelId videoId" },
        });
    }
    console.log(req.query.keyword);
    res.render("", { user: LoggedInUser, videos, moment });
  } catch (err) {
    res.send(err);
  }
});

// user subscribed channels
router.get("/feed/subscriptions", async (req, res) => {
  try {
    let LoggedInUser;
    if (req.session.passport?.user) {
      LoggedInUser = await userModel
        .findOne({
          _id: req.session.passport.user._id,
        })
        .populate({
          path: "notifications",
          populate: { path: "userId channelId videoId" },
        });
    }
    res.render("subscriptions", { user: LoggedInUser });
  } catch (error) {
    res.send(error);
  }
});

router.get("/feed/library", async (req, res) => {
  try {
    const videos = await videoModel
      .find({})
      .populate({ path: "userId", populate: { path: "channel" } });
    let LoggedInUser;
    if (req.session.passport?.user) {
      LoggedInUser = await userModel
        .findOne({
          _id: req.session.passport.user._id,
        })
        .populate({
          path: "notifications",
          populate: { path: "userId channelId videoId" },
        });
    }
    res.render("library", { user: LoggedInUser, videos, moment });
  } catch (err) {
    res.send(err);
  }
});

router.get("/comment/delete/:id", async function (req, res) {
  let comment = await commentModel.findOne({ _id: req.params.id });
  if (comment.userId.indexOf(req.session.passport?.user._id) !== -1) {
    comment.deleteOne({ _id: req.params.id });
  }
  res.redirect(req.headers.referer);
});

router.post("/comment/edit/:id", async function (req, res) {
  let comment = await commentModel.findOne({ _id: req.params.id });
  if (comment.userId.indexOf(req.session.passport?.user._id) !== -1) {
    comment.comment = req.body.comment;
    comment.save();
  }
  res.redirect(req.headers.referer);
});

// show user playlists
router.get('/user/playlist', async (req, res) => {
  try {
    res.send('user playlists')
  } catch (error) {
      res.send(error)
  }
});

router.get('/user/manage/channel', async (req, res)=>{
  try {
    const videos = await videoModel
      .find({ status: "public" })
      .populate({ path: "userId", populate: { path: "channel" } });
    let LoggedInUser;
    if (req.session.passport?.user) {
      LoggedInUser = await userModel
        .findOne({
          _id: req.session.passport.user._id,
        })
        .populate({
          path: "notifications",
          populate: { path: "userId channelId videoId" },
        })
        .populate("userPlaylist");
    }
    res.render("manageChannel", { user: LoggedInUser, videos, moment });
  } catch (error) {
    res.send(error);
  }
})

module.exports = router;
