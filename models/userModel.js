const mongoose = require("mongoose");
const plm = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
  },
  channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "channelModel",
  },
  username: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "Please add an email"],
    unique: true,
    uniqueCaseInsensitive: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  photoUrl: {
    type: String,
    default: "no-photo.jpg",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  password: {
    type: String,
  },
  
  notifications: [
    { type: mongoose.Schema.Types.ObjectId, ref: "notificationModel" },
  ],
  userPlaylist: [{ type: mongoose.Schema.Types.ObjectId , ref: "userPlayListModel" }],
  watchLater: [{ type: mongoose.Schema.Types.ObjectId, ref: 'videoModel' }]
});

UserSchema.plugin(plm);
module.exports = mongoose.model("userModel", UserSchema);
