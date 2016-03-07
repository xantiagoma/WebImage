var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect('/');
};

module.exports = function(passport){
    router.get('/', function(req, res) {
      res.render('index', { title: 'WebImage' });
    });

    router.get('/signin', function(req, res) {
        res.render('login', { message: req.flash('message') });
    });
    router.post('/signin', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/signin',
        failureFlash : true  
    }));

    router.get('/signup', function(req, res){
        res.render('register',{message: req.flash('message')});
    });

    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
        failureFlash : true  
    }));

    router.get('/home', isAuthenticated, function(req, res){
        res.render('home', { user: req.user });
    });

    router.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/signin');
    });

    return router;
}