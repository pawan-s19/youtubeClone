const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose
  .connect(
    "mongodb+srv://wetube:Suvidha@yt-cluster.rwwtlgg.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(function () {
    console.log("database connected!!");
  })
  .catch(function (err) {
    console.log(err);
  });
  
const UserSchema = new Schema({
  channelName: {
    type: String,
    required: [true, "Please add a channel name"],
    unique: true,
    uniqueCaseInsensitive: true,
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
});

module.exports = mongoose.model("userModel", UserSchema);
