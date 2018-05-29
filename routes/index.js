var express = require('express');
var router = express.Router();
var subtitleCtrl = require('../controllers/subtitle.controller')

/* GET home page. */
router.get('/download', subtitleCtrl.scraper);

module.exports = router;
