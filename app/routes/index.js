
var express = require('express');
var app = express();
var db = require('../models');
var routes;
var passport = require('passport');
var fs = require('fs');
var ejs = require('ejs');
var validator = require('validator');

var getDate = function() {
	date = new Date();
	y = date.getFullYear();
	m = ('0' + (date.getMonth() + 1)).slice(-2);
	d = date.getDate();
	date = ''+y+''+m+''+d;
	return date;
}

function loggedIn(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.redirect('/login');
    }
}

function handleError (err) {
  throw new Error(err.ErrorMessage);
}

function newContact (email) {
  mailjet.post('contact')
      .request({Email: email})
      .on('error', handleError);
}

function putContent(posts,html) {
	for (var i = O; i < posts.length; i++) {
		console.log(posts[i].title);
	};
}

function createContent(html) {

	var date = getDate();

	db.Link.findAll({where: {date: date}}).then( function (posts) {
		putContent(posts,html);
	});
}

function sendMail () {
	var str = fs.readFileSync(__dirname + '/../views/mail.ejs', 'utf8');
	console.log(str);
	var date = getDate();
	var compiled = ejs.compile(str);
	var recipients = new Array();
	db.Subscriber.findAll().then( function (subcribers) {
		for (var i = 0; i < subcribers.length; i++) {
			recipients.push({Email: subcribers[i].dataValues.email});
		}
		db.Link.findAll({where: {date: date}}).then( function (posts) {
			email = {};
		  email['FromName'] = 'Louis Amiot';
		  email['FromEmail'] = 'louis.amiot92@gmail.com';
		  email['Subject'] = 'Test Email';
		  email['Recipients'] = recipients;
		  email['Html-Part'] = compiled({posts:posts});

		  Mailjet.post('send')
		    .request(email)
		    .on('error', handleError);
		});
	});
}

routes = function() {
	var router = express.Router();
	

	/* HOMEPAGE */
	router.get('/', function (req, res) {

		var date = getDate();

		console.log(date);

		db.Link.findAll({where: {date: date}}).then( function (posts) {
			console.log(posts);
			res.render('index',{posts:posts});
		});

	});


	router.post('/', function (req, res) {
		if (validator.isEmail(req.body.email)) {
			db.Subscriber.findOrCreate({where: {email: req.body.email}, defaults: {email: req.body.email}});
			db.Link.findAll({where: {date: date}}).then( function (posts) {
				res.render('index',{posts:posts, success: 'Well done !'});
			});
		}
		else {
			db.Link.findAll({where: {date: date}}).then( function (posts) {
				res.render('index',{posts:posts, error: true});
			});
		}
	});


	/* ADMIN */
	router.post('/admin', loggedIn, function (req, res) {

		console.log(req.body.date);

		var postOne = {
	      title: 'hello',
	      description: 'hello',
	      link: 'hello',
	      date: 'hello'
	    }

	    var posts = [
			{
				title: req.body.titleOne,
				description: req.body.descriptionOne,
				link: req.body.linkOne,
				date: req.body.date
			},
			{
				title: req.body.titleTwo,
				description: req.body.descriptionTwo,
				link: req.body.linkTwo,
				date: req.body.date
			},
			{
				title: req.body.titleThree,
				description: req.body.descriptionThree,
				link: req.body.linkThree,
				date: req.body.date
			},
			{
				title: req.body.titleFour,
				description: req.body.descriptionFour,
				link: req.body.linkFour,
				date: req.body.date
			},
			{
				title: req.body.titleFive,
				description: req.body.descriptionFive,
				link: req.body.linkFive,
				date: req.body.date
			}
	    ];

	    db.Link.bulkCreate(posts).then(function (post) {
	      if (post.length < 1) {
	        // return Log error
	      };
	    });

		res.send('Got a POST request');
	});

	/* ADMIN */
	router.get('/admin', loggedIn, function (req, res) {
		res.render('admin');
	});

	router.post('/mail', loggedIn, function (req, res) {
		sendMail();
		res.send('Mail sent !')
	});

	router.get('/mail', loggedIn, function (req, res) {
		var date = getDate();

		console.log(date);

		db.Link.findAll({where: {date: date}}).then( function (posts) {
			console.log(posts);
			res.render('mail',{posts:posts});
		});
	});

	/* LOGIN */
	router.get('/login', function (req, res) {
		res.render('login');
	});

	router.post('/login', passport.authenticate('local', { failureRedirect: '/login' }), function(req, res) {
    	res.redirect('/admin');
  	});

	return router;

}

/*
  Expose routes
 */
module.exports = routes;