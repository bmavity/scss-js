var sys = require('sys'),
    fs = require('fs'),
    scss = require('../src');

fs.readFile('input.scss', function(err, scssFile) {
  scss.parse(scssFile.toString(), function(err, css) {
    sys.puts(css);
  });
});
