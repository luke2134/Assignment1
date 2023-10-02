// Filename: routes/index.js
//   Ibrahem Aqel Sit (# 301139448)
//   Creation date: 2021/09/29

let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let passport = require('passport');

// create the User Model instance
let userModel = require('../models/user');
let User = userModel.User; // alias

module.exports.displayHomePage = (req, res, next) => {
    res.render('index', {title: 'Home', email: req.user? req.user.email : ''});
}

module.exports.displayAboutPage = (req, res, next) => {
    res.render('index', {title: 'About Me', email: req.user? req.user.email : ''});
}

module.exports.displayProjectsPage = (req, res, next) => {
    res.render('index', {title: 'Projects', email: req.user? req.user.email : ''});
}

module.exports.displayServicesPage = (req, res, next) => {
    res.render('index', {title: 'Services', email: req.user? req.user.email : ''});
}

module.exports.displayContactMePage = (req, res, next) => {
    res.render('index', {title: 'Contact Me', email: req.user? req.user.email : ''});
}

// Login Page
module.exports.displayLoginPage = (req, res, next) => {
    // check if user is already logged in
    if(!req.user) {
        res.render('auth/login', {
            title: "Login", 
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : '',
            email: req.user? req.user.email : ''
        })
    } else {
        return res.redirect('/');
    }
}

module.exports.processLoginPage = (req, res, next) => {
    passport.authenticate('local',
    (err, user, info) => {
        // server error?
        if(err) {
            return next(err);
        }
        // is there a user login error?
        if(!user) {
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (err) => {
            // server error?
            if(err) {
                return next(err);
            }
            return res.redirect('/contact-list');
        });
    })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    // check if the user is not already logged in
    if(!req.user)
    {
        res.render('auth/register',
        {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : '',
            email: req.user? req.user.email : ''
        });
    }
    else
    {
        return res.redirect('/');
    }
}

module.exports.processRegisterPage = (req, res, next) => {
    console.log('!!!ProcessReg');
    // instantiate a user object
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    });

    User.register(newUser, req.body.password, (err) => {
        console.log('!! user register');
        if(err)
        {
            console.log("Error: Inserting New User");
            if(err.name == "UserExistsError")
            {
                req.flash(
                    'registerMessage',
                    'Registration Error: User Already Exists!'
                );
                console.log('Error: User Already Exists!')
            }
            return res.render('auth/register',
            {
                title: 'Register',
                messages: req.flash('registerMessage'),
                displayName: req.user ? req.user.displayName : ''
            });
        }
        else
        {
            return passport.authenticate('local')(req, res, () => {
                console.log('!!! passport authen');
                res.redirect('/contact-list')
            });
        }
    });
}

module.exports.performLogout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}