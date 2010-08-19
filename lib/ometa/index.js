var ometa = require('../ometa-js/ometa-node'); 

var createParser = function(grammar, parserCallback) {
  var parser;
  try {
    parser = ometa(grammar);
    parserCallback(null, {
      parse: function(code, callback) {
        callback(null, parser(code));
      }
    });
  }
  catch(err) {
    parserCallback({
      inner: err
    });
  }
};

module.exports.createParser = createParser;
