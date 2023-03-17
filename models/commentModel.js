const mongoose = require("mongoose");

var commentSchema = mongoose.Schema({
    comment: [{
        type : String,
        default : "~"
    }], 
    userId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
    }],
    name : String,
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "userModel" }],
    disLikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "userModel" }]
})


module.exports = mongoose.model("commentModel", commentSchema);