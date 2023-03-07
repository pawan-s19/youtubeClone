const mongoose = require("mongoose");

const videoModel = new mongoose.Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
    default: null,
  },
  thumbnailUrl: {
    type: String,
    default: "no-photo.jpg",
  },
  views: [{ type: mongoose.Schema.Types.ObjectId, ref: "userModel" }],
  
  status: {
    type: String,
    enum: ["private", "public"],
    default: "public",
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "userModel",
  },
});

module.exports = mongoose.model("videoModel",videoModel);