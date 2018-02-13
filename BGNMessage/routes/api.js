var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendStatus(200);
});

router.post('/', function(req, res, next) {
    res.sendStatus(200);
});

router.get('/:_id', function(req, res, next) {
    res.sendStatus(200);
});

router.delete('/:_id', function(req, res, next) {
    res.sendStatus(200);
});


module.exports = router;
