var express = require('express');
var downloadRoute = require('./download.route');
var cutvideo = require('./cutvideo.route');
var parseVideo = require('./parse.route');

const router = express.Router();

router.use('/download', downloadRoute);
router.use('/cut', cutvideo);
router.use('/parse', parseVideo);

module.exports = router
