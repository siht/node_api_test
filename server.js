var express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require('mongoose'),
  cors = require('cors'),
  Profile = require('./api/models/profileModel'),  //created model loading here
  bodyParser = require('body-parser');

var corsOptions = {
  origin: '*',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect(
  process.env.MONGO || 'mongodb://localhost:27017/Profile',
  { useNewUrlParser: true }
); 

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: true })); // read well post json
app.use(bodyParser.json());

// app.use(function(req, res) {
//   res.status(404).send({url: req.originalUrl + ' not found'})
// });

var profileRoutes = require('./api/routes/profileRoutes');
var uploadRoutes = require('./otherUrls/uploadImages');
uploadRoutes(app);
profileRoutes(app);

// app._router.stack.forEach(function(r){
//   if (r.route && r.route.path){
//     console.log(r.route.path)
//   }
// })

app.listen(port);
