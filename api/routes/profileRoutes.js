'use strict';
module.exports = function(app) {
  var profiles = require('../controllers/profileController');

  // profiles Routes
  app.route('/profiles')
    .get(profiles.list_all_profiles)
    .post(profiles.create_a_profile);


  app.route('/profiles/:profileId')
    .get(profiles.read_a_profile)
    .put(profiles.update_a_profile)
    .delete(profiles.delete_a_profile);
};
