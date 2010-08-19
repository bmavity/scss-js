var sys = require('sys'),
    fs = require('fs'),
    compiler = require('../src/scssCompiler');

fs.readFile(__dirname + '/input.scss', function(err, scssFile) {
  compiler.compile(scssFile.toString(), function(err, css) {
    sys.puts(css);
  });
});
