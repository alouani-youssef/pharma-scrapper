var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200)
  res.json({ data: {}, version:'1.0.0' });
});

module.exports = router;
