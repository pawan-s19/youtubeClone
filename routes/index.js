var express = require("express");
var router = express.Router();
/* GET home page. */

router.get("/", async function (req, res, next) {
  try {
    res.render("index");
  } catch (err) {
    return res.json(err);
  }
});

router.get("/upload/video", async (req, res) => {});
module.exports = router;
