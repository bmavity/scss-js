var sys = require('sys'),
    fs = require('fs'),
    ometa = require('../lib/ometa-js/ometa-node');

fs.readFile('scss.ometa', function(err, contents) {
  var parser = ometa(contents.toString());
  fs.readFile('input.scss', function(err, cssFile) {
    fs.writeFile('results.css', parser(cssFile.toString()).toString().replace(/\\n/g, '\n')); 
  });
});
