var subtitle_scraper = require('subtitle_scraper');
var youtubedl = require('youtube-dl');


var url = 'http://www.youtube.com/watch?v=90AiXO1pAiA';

function scraper(req, res) {
  var options = {
    // Write automatic subtitle file (youtube only)
    auto: false,
    // Downloads all the available subtitles.
    all: false,
    // Languages of subtitles to download, separated by commas.
    lang: 'en',
    // The directory to save the downloaded files in.
    cwd: __dirname,
  };
  youtubedl.getSubs(url, options, function(err, files) {
    if (err) throw err;

    console.log('subtitle files downloaded:', files);
  });
}

function downloadVideo(req, res) {
  var fs = require('fs');
  var youtubedl = require('youtube-dl');
  var video = youtubedl('http://www.youtube.com/watch?v=90AiXO1pAiA',
    // Optional arguments passed to youtube-dl.
    ['--format=18'],
    // Additional options can be given for calling `child_process.execFile()`.
    { cwd: __dirname });

  // Will be called when the download starts.
  video.on('info', function(info) {
    console.log('Download started');
    console.log('filename: ' + info.filename);
    console.log('size: ' + info.size);
  });

  video.pipe(fs.createWriteStream('myvideo.mp4'));
}

module.exports = {
  scraper,
  downloadVideo
};
