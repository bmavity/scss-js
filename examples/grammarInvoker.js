var sys = require('sys'),
    fs = require('fs'),
    ometa = require('ometa'),
    createdParser;

var getParser = function(callback) {
  if(!createdParser) {
    fs.readFile(__dirname + '/../src/cssSelector.ometa', function(err, contents) {
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
        }, 'selectors_group');
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
        sys.puts(css.toString());
      });
    }
  });
};


module.exports.parse = parse;
parse('a:nth-child(2)', function(err) {
  sys.puts(sys.inspect(err, true, null));
});
