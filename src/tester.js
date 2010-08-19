var sys = require('sys'),
    fs = require('fs'),
    ometa = require('../lib/ometa');

fs.readFile('scss.ometa', function(err, contents) {
  ometa.createParser(contents.toString(), function(err, parser) {
    fs.readFile('input.scss', function(err, scssFile) {
      parser.parse(scssFile.toString(), function(err, css) {
        fs.writeFile('results.css', css.toString().replace(/\\n/g, '\n')); 
      });
    });
  });
});
