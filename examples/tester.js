var sys = require('sys'),
    fs = require('fs'),
    scss = require('../src');

fs.readFile(__dirname + '/blog.scss', function(err, scssFile) {
  sys.puts(scssFile.toString());
  scss.parse(scssFile.toString(), function(err, css) {
    if(err) {
      sys.puts(sys.inspect(err));
    } else {
      sys.puts(css);
    }
  });
});
