const mongoose = require("mongoose");

var channelSchema= mongoose.Schema({
  channelName:String,
  username : String,
  channelDiscription:String,
  channelPlaylist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'playlistModel'
  }],
  video:[{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'videoModel'
  }],
  channelOwner:{
    type: mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  channelSubscription:[{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'user'
  }],
  channelProfile:{
    type: Object,
    default:{
        public_id:"",
        url:""
    }
  },
  channelBanner:{
    type: Object,
    default:{
        public_id:"",
        url:""
    }
  }
})


module.exports=mongoose.model("channelModel",channelSchema);