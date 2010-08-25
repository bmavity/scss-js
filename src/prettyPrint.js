function renderProperty(fileObj, propertyObj) {
  var getPropertyValue = function(val) {
    if(val.indexOf('$') == 0) {
      return fileObj.getVal(val.replace('$', ''));
    }
    return val;
  };

  return propertyObj.name + ': ' + getPropertyValue(propertyObj.val) + ';';
};

function renderBlock(fileObj, blockObj, scope) {
  var selector = blockObj.selector,
      scopeIndent = (scope && scope.indent) || '',
      currentIndent = scopeIndent + '  ',
      paddedScopeSelector = (scope && scope.selector) ? scope.selector + ' ' : '',
      currentSelector = paddedScopeSelector + selector,
      selectors = blockObj.selectors,
      properties = blockObj.properties,
      blocks = blockObj.blocks,
      mixins = blockObj.mixins,
      css = scopeIndent + currentSelector;

  mixins.forEach(function(mixinName) {
    var mixin = fileObj.getMixin(mixinName);
    //Why doesn't .concat() work?
    //properties.concat(mixin.properties);
    //blocks.concat(mixin.blocks);
    mixin.properties.forEach(function(property) {
      properties.push(property);
    });
    mixin.blocks.forEach(function(block) {
      blocks.push(block);
    });
  });

  selectors.forEach(function(sel) {
    css += ',\n' + scopeIndent + paddedScopeSelector + sel;
  });

  css += ' {\n';

  properties.forEach(function(property) {
    css += currentIndent + renderProperty(fileObj, property) + '\n';
  });

  css += scopeIndent + '}\n';

  blocks.forEach(function(block) {
    css += renderBlock(fileObj, block, {
      indent: currentIndent,
      selector: currentSelector
    });
  });

  return css;
};

function renderFile(fileObj) {
  var blocks = fileObj.blocks,
      css = '';
  
  blocks.forEach(function(block) {
    css += renderBlock(fileObj, block);
    css += '\n';
  });

  return css;
};

function render(cssObj, callback) {
  var css;
  try {
    css = renderFile(cssObj);
    callback(null, css)
  }
  catch(ex) {
    callback(ex);
  }
};


module.exports.render = render;
