const mongoose = require("mongoose");

const videoModel = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
      default: null,
    },
    thumbnail: {
      secure_url: { type: String },
      public_id: { type: String },
    },
    duration: Number,
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
    video_id: { type: mongoose.Schema.Types.ObjectId },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "userModel" }],
    disLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "userModel" }],
    comment: [{ type: mongoose.Schema.Types.ObjectId, ref: "commentModel" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("videoModel", videoModel);
