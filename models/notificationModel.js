const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const notificationSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
  channelId: { type: mongoose.Schema.Types.ObjectId, ref: "channelModel" },
  videoId: { type: mongoose.Schema.Types.ObjectId, ref: "videoModel" },
});

module.exports = mongoose.model("notificationModel", notificationSchema);
