var express = require("express");
var router = express.Router();
const userModel = require("../models/userModel");
/* GET home page. */

router.get("/", async function (req, res, next) {
  try {
    res.render("index");
  } catch (err) {
    return res.json(err);
  }
});

router.get('/home', async (req, res) => {
  try {
    res.render('home');
  } catch (error) {
    return res.json(err);
  }
})

router.get("/upload/video", async (req, res) => {});
module.exports = router;
