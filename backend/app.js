'use strict';
var express = require('express');        // call express
var app = express();                    // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');
var db = require('./config/db'); // get db config file
var port = 3000;
var base_api = "/api/v1";
var cors = require('cors') // call the cors to fix access control bug.
const dotenv = require('dotenv');
dotenv.config();
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger');


app.get('/', function mainHandler(req, res) {
  throw new Error('Broke!');
});

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
});

app.use(cors());
// app.use(fileUpload());

app.use(express.static(__dirname + '/uploads'));
// app.options('*', cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// ROUTES FOR OUR API
// =============================================================================
app.get("/", (req, res) => {
  res.json({ message: "Welcome to our Tazweed app!" });
  // res.send('index');
  // res.redirect('https://airbrowz.com/');
});

app.get('/admin', function (req, res) {
  res.render('admin', { title: 'Express' });
});



app.get("/profile", (req, res) => {
  // logger.info("profile: ", req.user);
  res.json({ message: "Welcome profile!" });
});


var user = require('./routes/user');
var auth = require('./routes/auth');
var seller = require('./routes/seller');
var booking = require('./routes/booking');
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use(base_api + "/user", user);
app.use(base_api + "/auth", auth);
app.use(base_api+'/seller',seller)
app.use(base_api+'/booking',booking)

let server = app.listen(port, function () {
  console.log('server listen started', port);
});


// console.log(" ---- Process Variables ----- ", process.env)


module.exports = app; // for testing
