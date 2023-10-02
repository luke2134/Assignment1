/* Filename: routes/index.js
//   Ibrahem Aqel Sit (# 301139448)
//   Creation date: 2021/09/29
  
  Routing for 5 pages. */

let express = require('express');
let router = express.Router();

let indexController = require('../controllers/index');

router.get('/', indexController.displayHomePage);

router.get('/home', indexController.displayHomePage);

router.get('/about', indexController.displayAboutPage);

router.get('/projects', indexController.displayProjectsPage);

router.get('/services', indexController.displayServicesPage);

router.get('/contact', indexController.displayContactMePage);

// Login page
router.get('/login', indexController.displayLoginPage);

// Process Login
router.post('/login', indexController.processLoginPage);

/* GET Route for displaying the Register page */
router.get('/register', indexController.displayRegisterPage);

/* POST Route for processing the Register page */
router.post('/register', indexController.processRegisterPage);

/* GET to perform UserLogout */
router.get('/logout', indexController.performLogout);

module.exports = router;
