var express = require('express');
var router = express.Router();
var processCtrl = require('../controllers/process.controller');

var downloadCtrl = require('../controllers/download.controller');

/* GET home page. */
router.route('/').get(processCtrl.cutVideo);

module.exports = router;
