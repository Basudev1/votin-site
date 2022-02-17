var express = require("express");
const res = require("express/lib/response");
var router = express.Router();

/* Login Endpoint */
router.post("/login", function (req, res, next) {
  const { email, password } = req.body;
  res.status(200).json({ success: email, password });
});

//Signup Endpoint

router.post("/signup", async (req, res) => {
  const { username, email, password, cpassword } = req.body;
  res.status(200).json({ username, password, email });
});

module.exports = router;
