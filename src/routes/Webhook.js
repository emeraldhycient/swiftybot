const express = require("express");
const router = express.Router();

router.get("/webhook", (req, res) => {
  res.send("yo meet swifty the archive bot 🤖");
  console.log("yo meet swifty the archive bot 🤖");
});

module.exports = router;
