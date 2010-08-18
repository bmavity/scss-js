var sys = require('sys'),
    fs = require('fs'),
    ometa = require('../../ometa-js/ometa-node');

fs.readFile('./scss.ometa', function(err, contents) {
  fs.writeFile('results.css', ometa(contents.toString()).toString().replace(/\\n/g, '\n')); 
});
