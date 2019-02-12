var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('User');
});

router.get('/**', function(req, res, next) {
  res.status(404).json({ msg: 'Path Not Found', path: req.url });
});

module.exports = router;
