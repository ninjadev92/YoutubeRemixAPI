var express = require('express');
var router = express.Router();
var processCtrl = require('../controllers/process.controller');

/* GET home page. */
router.route('/').get(processCtrl.vttParser);

module.exports = router;
