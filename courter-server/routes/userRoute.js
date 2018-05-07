const express = require("express"),
  router = express.Router(),
  User = require("../models/userSchema"),
  config = require("../config"),
  googleMapsClient = require("@google/maps").createClient({
    key: config.keys.googlemaps
  }),
  userEvents = require('../services/userEvents');

router.get("/current_user", (req, res) => {
  res.send(req.user);
});

/*------------
GETTING USER DATA
-------------*/
router.post("/all", async (req, res) => {
  const users = await User.find({});
  res.send(users);
});

router.post("/one", async (req, res) => {
  const user = await User.findById(req.body.user_id);
  res.send(user);
});

/*------------
USER SETTINGS
-------------*/
router.post("/settutorial", async (req, res) => {
  const user = await userEvents.setTutorial(req);
  res.send(user);
});

//LOCATION
router.post("/setlocation", async (req, res) => {
  const user = await userEvents.setLocation(req);
  res.send(user);
});

router.post("/setalluserinfo", async (req, res) => {
  const user = await userEvents.setAllUserInfo(req);
  res.send(user);
});

//IB SEARCH PARAMS
router.post("/setdistanceandage", async (req, res) => {
  const user = await userEvents.setDistanceAndAge(req);
  res.send(user);
});

module.exports = router;
