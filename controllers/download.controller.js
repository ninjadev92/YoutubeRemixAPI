var youtubedl = require('youtube-dl');
var fs = require('fs');
var webvtt = require('node-webvtt');
var getYoutubeSubtitles = require('@joegesualdo/get-youtube-subtitles-node');

// video id: 4zIx7J882Fg
// uVwtVBpw7RQ
// xGmXxpIj6vs
function downloadVideo(req, res) {

  // create the directory using input youtube video id
  var outputDir = `public/video/${req.params.id}`;
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
  }

  var video = youtubedl(`http://www.youtube.com/watch?v=${req.params.id}`,
    // Optional arguments passed to youtube-dl.
    ['--format=18'],
    // Additional options can be given for calling `child_process.execFile()`.
    { cwd: __dirname });

  video.on('info', function(info) {
    console.log('Download started');
    console.log('filename: ' + info.filename);
    console.log('size: ' + info.size);
    var output = `${outputDir}/${req.params.id}.mp4`
    video.pipe(fs.createWriteStream(output));
  });

  // get SRT file using the given youtube video id
  var videoId = req.params.id

  getYoutubeSubtitles(videoId, {type: 'auto'})
  .then(subtitles => {
    var output = `${outputDir}/${req.params.id}.json`
    fs.writeFileSync(output, JSON.stringify(subtitles, null, 4))
  })
  .catch(err => {
    console.log('Error: ', err)
  })
}

module.exports = {
  downloadVideo
};
