var express = require('express');
var router = express.Router();


router.get('/gerichte', function(req, res, next) {
  console.log("try");
  
  
  res.redirect('/');
  
});