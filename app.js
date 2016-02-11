// TODO
// - Form verification in front
// - Admin with connection
// - Bug when wrong username and password filled



var express       = require('express'),
	app           = express(),
	passport      = require('passport'),
	Strategy      = require('passport-local').Strategy,
	flash         = require('connect-flash'),
	router        = express.Router(),
	db            = require('./app/models'),
	debug         = require('debug')('express-example'),
	bodyParser    = require('body-parser');
  apiKey        = 'e5ab98eec273ad484bff5a57c18a7fc1',
  apiSecret     = '2cefbc51947cdea6141b9c89e1dc5d4e',
  Mailjet       = require('node-mailjet').connect(apiKey, apiSecret);


app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//MAIL
var http = require('http'),
    fs = require('fs');

//PASSPORT
passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  db.User.findById(id).then(function (user) {
    cb(null, user);
  });
});

passport.use(new Strategy(
  function(username, password, cb) {
    db.User.findOne({where: {username: username}}).then(function(user) {
      if (user.length < 1) { return cb(null)};
      if (!user) {return cb(null, false); }
      if (user.password != password) { return cb(null, false); }
      return cb(null, user);
    });
}));

app.use(express.static('app'));
app.set('views', './app/views')
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 80);

var routes = require('./app/routes');

app.use('/', routes());

// var user = {
// 	username: 'louisamiot',
// 	password: 'cocacola92'
// }
// db.User.create(user);

db.sequelize.sync().then(function () {
  var server = app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + server.address().port);
  });
});