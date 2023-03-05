var express = require("express");
var router = express.Router();
const mongodb = require("mongodb");
/* GET home page. */
let client;
async function connectDatabase() {
  client = new mongodb.MongoClient("mongodb://localhost:27017/youtube");
  await client.connect();
  console.log("database connected !!");
}

router.get("/", async function (req, res, next) {
  try {
    connectDatabase();
    res.render("index");
  } catch (err) {
    return res.json(err);
  }
});

router.get("/upload/video", async (req, res) => {
  
});
module.exports = router;
