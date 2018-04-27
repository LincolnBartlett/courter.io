const express = require("express"),
  router = express.Router(),
  User = require("../models/userSchema"),
  config = require("../config"),
  googleMapsClient = require("@google/maps").createClient({
    key: config.keys.googlemaps
  });

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
//LOCATION
router.post("/setlocation", async (req, res) => {
  const user = await User.findById(req.body.user_id);
  googleMapsClient.reverseGeocode(
    { latlng: [req.body.latitude, req.body.longitude] },
    (err, response) => {
      let neighborhood = "";

      response.json.results[0].address_components.map(component => {
        if (component.types.includes("neighborhood") === true) {
          neighborhood = component.long_name;
        }
      });

      user.location.neighborhood = neighborhood;
      user.geotag = [req.body.longitude, req.body.latitude];
      user.location.latitude = req.body.latitude;
      user.location.longitude = req.body.longitude;
      user.save();
      res.send(user);
    }
  );
});

router.post("/setalluserinfo", async (req, res) => {
  const user = await User.findById(req.body.user_id);
  user.age = req.body.age;
  user.sex = req.body.sex;
  user.save();
  res.send(user);
});

//IB SEARCH PARAMS
router.post("/setdistanceandage", async (req, res) => {
  const user = await User.findById(req.body.user_id);
  user.settings.distance = req.body.distance;
  user.settings.agemax = req.body.agemax;
  user.settings.agemin = req.body.agemin;
  user.save();
  res.send(user);
});

module.exports = router;
