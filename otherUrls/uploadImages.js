'use strict';
var mongoose = require('mongoose'),
  Profile = mongoose.model('Profile');
const ImgurStorage = require('multer-storage-imgur');
const multer = require('multer');
const upload = multer(
    {
        storage: ImgurStorage({ 'clientId': process.env.IMGUR_CLIENT_ID})
    }
).single('image');

module.exports = function(app) {
    app.post('/profile/:profileId/upload-image', (req, res) => {
        upload(req, res, function (err) {
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
                      Profile.findById(
                        req.params.profileId,
                        function(err, profile) {
                          if (err){
                            console.error(err);
                            res.status(400).send(err);
                          }
                          res.json(profile);
                        }
                      );
                    }
                );
            }
        })
    });
}
