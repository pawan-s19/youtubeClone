const mongoose = require("mongoose");

const playListModel = new mongoose.Schema({
    playListName:String,
    creater:{type:mongoose.Schema.Types.ObjectId}
})