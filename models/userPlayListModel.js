const mongoose = require("mongoose");

const playListModel = new mongoose.Schema({
    playListName:String,
    creater:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "userModel",
    },
    videos:[{
        type: mongoose.Schema.Types.ObjectId,
        ref : "videoModel"
    }],
    comment: [{ 
        type: mongoose.Schema.Types.ObjectId,
        ref: "commentModel" 
    }],
    isPrivate: {
        type: Boolean,
        default: true
    }
})

module.exports = mongoose.model("userPlayListModel", playListModel);