// Filename: routes/users.js
//   Ibrahem Aqel Sit (# 301139448)
//   Creation date: 2021/09/29

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('Placeholder');
});

module.exports = router;
