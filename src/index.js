var sys = require('sys'),
    fs = require('fs'),
    ometa = require('../lib/ometa'),
    createdParser;

var getParser = function(callback) {
  if(!createdParser) {
    fs.readFile('scss.ometa', function(err, contents) {
      if(err) {
        callback(err);
      } else {
        ometa.createParser(contents.toString(), function(err, parser) {
          if(err) {
            callback(err);
          } else {
            createdParser = parser;
            callback(null, createdParser);
          }
        });
      }
    });
  } else {
    callback(null, createdParser);
  }
};

var parse = function(scssFile, callback) {
  getParser(function(err, parser) {
    if(err) {
      callback(err);
    } else {
      parser.parse(scssFile, function(err, css) {
        callback(err, css.toString().replace(/\\n/g, '\n'));
      });
    }
  });
});


module.exports.parse = parse;
