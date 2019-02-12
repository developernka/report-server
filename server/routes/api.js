var express = require('express');
var router = express.Router();
const started_at = new Date();
const protected_paths = ['users'];
const ctrl = require('../controller/data');

router.use((req, res, next) => {
  const paths = req.url.split('/');
  if (paths.length) {
    if (protected_paths.indexOf(paths[1]) > -1) {
      res.status(404).send('Protected Path');
    } else {
      next();
    }
  } else {
    next();
  }
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(400).json({ msg: 'Api is running', start: started_at });
});

router.get('/:collection', ctrl.list);

router.get('/:collection/:id', ctrl.read);

router.post('/:collection', ctrl.create);

router.post('/:collection/:id', ctrl.update);

router.delete('/:collection/:id', ctrl.trash);

router.get('/**', function(req, res, next) {
  res.status(404).json({ msg: 'Path Not Found', path: req.url });
});

module.exports = router;
