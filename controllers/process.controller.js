// var ffmpeg = require('ffmpeg');
var ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
var ffprobePath = require('@ffprobe-installer/ffprobe').path;
var ffmpeg = require('fluent-ffmpeg');

var webvtt = require('node-webvtt');
var videoStitch = require('video-stitch');
var path = require('path');

var fs = require('fs');

var vttToJson = require("vtt-to-json")

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

function cutVideo(req, res) {

  var command1 = ffmpeg()
    .input('public/video/sample.mp4')
    .setStartTime('00:00:01.890')
    .setDuration('00.900')
    .output('public/video/output1.mp4')
    .run();

  var command2 = ffmpeg()
    .input('public/video/sample.mp4')
    .setStartTime('00:00:04.140')
    .setDuration('00.750')
    .output('public/video/output2.mp4')
    .run();

  var command2 = ffmpeg()
    .input('public/video/output1.mp4')
    .input('public/video/output2.mp4')
    .on('error', function(err) {
      console.log('An error occurred: ' + err.message);
    })
    .on('end', function() {
      console.log('Merging finished!');
    })
    .mergeToFile('public/video/result.mp4', 'controllers');

  return {command1, command2}
}

function vttParser(req, res) {
  const segmentDuration = 10; // default to 10
  const startOffset = 0; // Starting MPEG TS offset to be used in timestamp map, default 900000

  var inputUrl = './public/video/sampleVtt.vtt'
  var data = '';
  try {
    data = fs.readFileSync(inputUrl, 'utf8');
  } catch(e) {
    console.log('Error:', e.stack);
  }

  const parsed = webvtt.parse(data);
  console.log('--------------', parsed);
  const segmented = webvtt.parse(data, segmentDuration);
  const playlist = webvtt.hls.hlsSegmentPlaylist(data, segmentDuration);
  const segments = webvtt.hls.hlsSegment(data, segmentDuration, startOffset);
}

module.exports = {
  cutVideo,
  vttParser
};
