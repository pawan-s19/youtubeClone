const mongoose = require("mongoose");
exports.connectDB = () => {
  mongoose.set("strictQuery", false);
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
};

// mongodb+srv://wetube:Suvidha@yt-cluster.rwwtlgg.mongodb.net/?retryWrites=true&w=majority