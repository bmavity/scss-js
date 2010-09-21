var sys = require('sys'),
    fs = require('fs'),
    ometa = require('ometa'),
    creatingParser = false;

var createParser = function(parserInitializer) {
  if(!creatingParser) {
    creatingParser = true;
    fs.readFile(__dirname + '/../src/cssSelector.ometa', function(err, contents) {
      if(err) {
        parserInitializer.setParser(err);
      } else {
        ometa.createParser(contents.toString(), parserInitializer.setParser);
      }
    });
  }
};

var parserInitializer = (function() {
  var createdParser,
      parserErr,
      queuedCallbacks = [],
      that = {};

  that.setParser = function(err, parser) {
    parserErr = err;
    createdParser = parser;
    queuedCallbacks.forEach(function(callback) {
      callback(parserErr, createdParser);
    });
    queuedCallbacks = [];
  };

  that.addCallback = function(callback) {
    if(parserErr || createdParser) {
      callback(parserErr, createdParser);
    } else {
      queuedCallbacks.push(callback);
      createParser(that);
    }
  };

  return that;
})();

var parse = function(selector, callback) {
  parserInitializer.addCallback(function(err, parser) {
    if(err) {
      callback(err);
    } else {
      parser.parse(selector, 'selectors_group', function(err, css) {
        callback(null, css.toString());
      });
    }
  });
};


module.exports.parse = parse;
