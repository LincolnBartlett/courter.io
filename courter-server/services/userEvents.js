const User = require("../models/userSchema"),
  config = require("../config"),
  googleMapsClient = require("@google/maps").createClient({
    key: config.keys.googlemaps
  });

let userEvents = {};

userEvents.setTutorial = async req => {
    const user = await User.findById(req.body.user_id);
    user.settings.tutorial = req.body.tutorial;
    user.save();
  return user;
};

userEvents.setLocation = async req => {
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
      user.save();
     
    }
  );
  return user;
};

userEvents.setAllUserInfo = async req => {
  const user = await User.findById(req.body.user_id);
  user.age = req.body.age;
  user.sex = req.body.sex;
  user.nickname = req.body.nickname;
  user.settings.preference = req.body.preference;
  user.save();
return user;
};

userEvents.setDistanceAndAge = async req => {
  const user = await User.findById(req.body.user_id);
  user.settings.distance = req.body.distance;
  user.settings.agemax = req.body.agemax;
  user.settings.agemin = req.body.agemin;
  user.save();
return user;
};

module.exports = userEvents;
