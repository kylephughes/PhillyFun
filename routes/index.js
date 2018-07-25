var express = require('express');
var router = express.Router();


router.get('/hello', function(req, res, next) {
  res.json({success: false, message: `Failed to create a new list. Error`});
});
router.get('/', function(req, res, next) {
  res.send('api works');
});
router.get('*',function(req,res,next) {
  res.sendFile('./public/index.html');
});
module.exports = router;
