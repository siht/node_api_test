'use strict';
const mongoose = require('mongoose')
  ,Profile = mongoose.model('Profile')
  ,multer = require('multer')
  ,ImgurStorage = require('multer-storage-imgur')
  ,upload = multer(
    {storage: ImgurStorage({ 'clientId': process.env.IMGUR_CLIENT_ID})}
  );

module.exports = function(app) {
  app.post('/profile/:profileId/upload-image', (req, res) => {
    upload.single('image')(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        console.error(err);
        res.status(500).json(err);
      } else if (err) {
        console.error(err);
        res.status(500).json(err);
      }
      else{
        Profile.findOneAndUpdate(
          {_id: req.params.profileId},
          {imagen: req.file.data.link},
          function(err, profile) {
            if (err){
              console.error(err);
              res.status(400).send(err);
            }
            else{
              Profile.findById(
                profile._id,
                function(err, profile) {
                  if (err){
                    console.error(err);
                    res.status(400).send(err);
                  }
                  res.json(profile);
                }
              );   
            }
          }
        );
      }
    })
  });
}
