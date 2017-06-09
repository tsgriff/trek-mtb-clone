var express = require('express'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    massive = require("massive"),
    config = require('./server_config.js'),
    passport = require('passport'),
    Auth0Strategy = require('passport-auth0');

var massiveUri = config.MASSIVE_URI;

var db = massive.connectSync({
    connectionString: massiveUri
  });
var app = module.exports = express();
app.set('db', db);

var homeControl = require('./Server/controllers/homeControl.js');
var bikeControl = require('./Server/controllers/bikeControl.js');

app.use(express.static('dist'));
app.use(bodyParser());
app.use(session({secret: config.auth_secret}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain: config.auth_domain,
    clientID: config.auth_id,
    clientSecret: config.auth_secret,
    callbackURL: 'http://localhost:3000/auth/callback'
}, function(accessToken, refreshToken, extraParams, profile, done) {

    return done(null, profile);
}));

app.get('/auth',
    passport.authenticate('auth0'));

app.get('/auth/callback',
    passport.authenticate('auth0', {
        successRedirect: '/#!' + '/profile',
        failureRedirect: '/#!' + '/'
}));

passport.serializeUser(function(user, done) {
      done(null, user);
});

passport.deserializeUser(function(user, done) {
      //What do we want to put on req.user?
      done(null, user);
});

var userCtrl = require('./server/controllers/userCtrl')

app.get('/me', userCtrl.me);

//// HOME -> BIKE DETAILS ////

app.get('/api/home', homeControl.getBikesHome);
app.get('/api/bike/:id', bikeControl.getBikeDetails);

/////// CART ////

app.post('/api/cart', function(req, res) {
  if (!req.session.cart) {
    req.session.cart = [];
  }
  if (!req.body.model) {
   res.status(400).send("You need to send a product");
  }

    req.session.cart.push(req.body);
    return res.status(200).json(req.session.cart);
});

app.get('/api/cart', function(req, res) {
  res.status(200).json(req.session.cart);
});

app.delete('/api/cart', function(req, res) {
  req.session.cart = [];
  res.status(200).json(req.session.cart);
})

app.listen(80, function(){
  console.log("Running on 80");
});
