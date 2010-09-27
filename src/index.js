var sys = require('sys'),
    fs = require('fs'),
    ometa = require('ometa'),
    rule = 'scssFile',
    createdParser;

var getParser = function(callback) {
  if(!createdParser) {
    fs.readFile(__dirname + '/CssSelector.ometa', function(err, cssSelectorContents) {
      ometa.createParser(cssSelectorContents.toString(), function(err, cssSelectorParser) {
        fs.readFile(__dirname + '/scss.ometa', function(err, contents) {
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
      });
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
      parser.parse(scssFile, rule, function(err, css) {
        require(__dirname + '/prettyPrint').render(css, function(inner, printed) {
          callback(err, printed);
        });
      });
    }
  });
};


module.exports.parse = parse;
