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
  userPlaylist: [{ types: mongoose.Schema.Types.ObjectId }],
});

UserSchema.plugin(plm);
module.exports = mongoose.model("userModel", UserSchema);
