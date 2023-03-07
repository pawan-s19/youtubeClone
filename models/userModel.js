const mongoose = require("mongoose");
const plm = require("passport-local-mongoose")
const Schema = mongoose.Schema;

mongoose.set('strictQuery', false)
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
  name:{
    type:String
  },
  channelName: {
    type: String,
    default : ""
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
  discription: {
    type: String,
  }
});

UserSchema.plugin(plm)
module.exports = mongoose.model("userModel", UserSchema);
