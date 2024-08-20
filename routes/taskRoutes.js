const express = require("express");
const router = express.Router();
const auth = require('../middlewares/auth');
const Task = require("../models/Task");


router.get("/test", auth, (req, res) => {
  res.json({
    message:"Task routes are working!",
    user: req.user});
});

//CRUD tasks


module.exports = router;
