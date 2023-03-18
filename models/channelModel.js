const mongoose = require("mongoose");

var channelSchema= mongoose.Schema({
  channelName:String,
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
    ref:'userModel'
  },
  channelSubscription:[{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'userModel'
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
  },
  subscriberCount:[{
    type: mongoose.Schema.Types.ObjectId,
    ref : 'userModel'
  }]
})


module.exports=mongoose.model("channelModel",channelSchema);