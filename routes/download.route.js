var express = require('express');
var router = express.Router();
var downloadCtrl = require('../controllers/download.controller');

/* GET home page. */
router.route('/:id').get(downloadCtrl.downloadVideo);

module.exports = router;
