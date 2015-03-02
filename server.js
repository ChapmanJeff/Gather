var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session')
var passport = require('passport');
var request = require('request')
var InstagramStrategy = require('passport-instagram').Strategy;
var port = (process.env.EXPRESS_PORT || 80);

var mongoUri = 'mongodb://localhost/gather';
mongoose.connect(mongoUri);

var clientID = 'a090d1e52313460cb90ae5a9873750a0';
var clientSecret = '1db8f9da16ab423cbb37c8f3700c32b6';

// Controllers ==================

var userCtrl = require('./api/controllers/userCtrl');
var tagsCtrl = require('./api/controllers/tagsCtrl');
var dataCtrl = require('./api/controllers/dataCtrl');
var mediaCtrl = require('./api/controllers/mediaCtrl');
var collectionsCtrl = require('./api/controllers/collectionsCtrl');

// Middleware ===================

passport.use(new InstagramStrategy({
    clientID: (process.env.INSTAGRAM_CLIENT_ID || clientID), 
    clientSecret: (process.env.INSTAGRAM_CLIENT_SECRET || clientSecret),
    callbackURL: "http://localhost:9090/auth/instagram/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // User.findOrCreate({ instagramId: profile.id }, function (err, user) {
      profile.access = accessToken;
      userCtrl.updateOrCreate(profile).then(function(user) {
        done(null, user);
      }, function (err) {
        done(err, profile);
      })
  }));

var app = express();
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(session({secret: '$uper$secret!Key!$'}))
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
	done(null, user)
});
passport.deserializeUser(function(obj, done) {
	done(null, obj);
})

// Authentication ==================

var isAuthed = function (req, res, next) {
	if(!req.isAuthenticated()) {
		return res.status(403).end();
	}
	return next();
}



app.get('/auth/instagram', passport.authenticate('instagram'));
app.get('/auth/instagram/callback', 
  passport.authenticate('instagram', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/#/home');
  });


// app.get('/', function(req, res){
// 	res.sendFile('/login.html');
// })

// app.get('/app', isAuthed, express.static(__dirname + '/public'));

app.get('/auth/me', function(req, res){
	return res.json(req.user); // req.user.
});

// Endpoints =====================

// app.get('/api/tags', isAuthed, tagsCtrl.list);

// app.post('/api/tags', isAuthed, tagsCtrl.post);

// app.put('/api/tags/:id', isAuthed, tagsCtrl.update);

app.get('/api/collections', isAuthed, collectionsCtrl.list);

app.post('/api/collections', isAuthed, collectionsCtrl.post);

app.get('/api/profile', isAuthed, userCtrl.profile);

app.get('/api/updatedProfile', isAuthed, userCtrl.update);

// app.get('/api/userRecentMedia', isAuthed, dataCtrl.userHash);

// app.get('/api/allMedia', isAuthed, dataCtrl.allMedia);

app.get('/api/updateOrCreateMedia', isAuthed, mediaCtrl.updateOrCreate);

app.get('/api/dbMedia', isAuthed, mediaCtrl.list)

// app.get('/api/quickMedia', isAuthed, dataCtrl.quickMedia);

app.get('/api/populateCollection/:tag', isAuthed, mediaCtrl.sortByTag)

app.get('/api/logout', isAuthed, function(req, res){
  req.logout();
  res.redirect('/#/');
  console.log(123);
});

app.delete('/api/deleteCollection/:id', isAuthed, collectionsCtrl.delete)

// Connections ===================

mongoose.connection.once('open', function () {
  console.log('Connected to db at ' + mongoUri)
})

app.listen(port, function () {
	console.log('Listening on port ' + port);
})