var vows = require('vows'),
    assert = require('assert'),
    selectorGrammar = require(__dirname + '/grammarInvoker');

var shouldParse = function() {
  var selector,
      context = {
        topic: function() {
          selector = this.context.name;
          selectorGrammar.parse(selector, this.callback);
        }
      };

  context['should parse selector'] = function(err, parsedSelector) {
    assert.equal(parsedSelector, selector);
  };

  return context;
};

var shouldParseTo = function(expectedSelector) {
  var context = {
        topic: function() {
          var selector = this.context.name;
          selectorGrammar.parse(selector, this.callback);
        }
      };

  context['should parse selector'] = function(err, parsedSelector) {
    assert.equal(parsedSelector, expectedSelector);
  };

  return context;
};

vows.describe('Summarized Selectors').addBatch({
  // Taken from http://www.w3.org/TR/css3-selectors/#selectors

  '*': shouldParse(),
  'E': shouldParse(),
  'E[foo]': shouldParse(),
  'E[foo="bar"]': shouldParse(),
  'E[foo~="bar"]': shouldParse(),
  'E[foo^="bar"]': shouldParse(),
  'E[foo$="bar"]': shouldParse(),
  'E[foo*="bar"]': shouldParse(),
  'E[foo|="en"]': shouldParse(),
  'E:root': shouldParse(),
  'E:nth-child(n)': shouldParse(),
  'E:nth-last-child(n)': shouldParse(),
  'E:nth-of-type(n)': shouldParse(),
  'E:nth-last-of-type(n)': shouldParse(),
  'E:first-child': shouldParse(),
  'E:last-child': shouldParse(),
  'E:first-of-type': shouldParse(),
  'E:last-of-type': shouldParse(),
  'E:only-child': shouldParse(),
  'E:only-of-type': shouldParse(),
  'E:empty': shouldParse(),
  'E:link': shouldParse(),
  'E:visited': shouldParse(),
  'E:active': shouldParse(),
  'E:hover': shouldParse(),
  'E:focus': shouldParse(),
  'E:target': shouldParse(),
  'E:lang(fr)': shouldParse(),
  'E:enabled': shouldParse(),
  'E:disabled': shouldParse(),
  'E:checked': shouldParse(),
  'E::first-line': shouldParse(),
  'E::first-letter': shouldParse(),
  'E::before': shouldParse(),
  'E::after': shouldParse(),
  'E.warning': shouldParse(),
  'E#myid': shouldParse(),
  'E:not(s)': shouldParse(),
  'E F': shouldParse(),
  'E > F': shouldParse(),
  'E + F': shouldParse(),
  'E ~ F': shouldParse()
}).run();


vows.describe('Lonely Selectors').addBatch({
  // Taken from http://www.w3.org/TR/css3-selectors/#selectors,
  // but without the element names

  '[foo]': shouldParse(),
  '[foo="bar"]': shouldParse(),
  '[foo~="bar"]': shouldParse(),
  '[foo^="bar"]': shouldParse(),
  '[foo$="bar"]': shouldParse(),
  '[foo*="bar"]': shouldParse(),
  '[foo|="en"]': shouldParse(),
  ':root': shouldParse(),
  ':nth-child(n)': shouldParse(),
  ':nth-last-child(n)': shouldParse(),
  ':nth-of-type(n)': shouldParse(),
  ':nth-last-of-type(n)': shouldParse(),
  ':first-child': shouldParse(),
  ':last-child': shouldParse(),
  ':first-of-type': shouldParse(),
  ':last-of-type': shouldParse(),
  ':only-child': shouldParse(),
  ':only-of-type': shouldParse(),
  ':empty': shouldParse(),
  ':link': shouldParse(),
  ':visited': shouldParse(),
  ':active': shouldParse(),
  ':hover': shouldParse(),
  ':focus': shouldParse(),
  ':target': shouldParse(),
  ':lang(fr)': shouldParse(),
  ':enabled': shouldParse(),
  ':disabled': shouldParse(),
  ':checked': shouldParse(),
  '::first-line': shouldParse(),
  '::first-letter': shouldParse(),
  '::before': shouldParse(),
  '::after': shouldParse(),
  '.warning': shouldParse(),
  '#myid': shouldParse(),
  ':not(s)': shouldParse()
}).run();


vows.describe('Attribute Selectors with Identifiers').addBatch({
  '[foo~=bar]': shouldParse(),
  '[foo^=bar]': shouldParse(),
  '[foo$=bar]': shouldParse(),
  '[foo*=bar]': shouldParse(),
  '[foo|=en]': shouldParse()
}).run();


vows.describe('Nth Selectors').addBatch({
  ':nth-child(-n)': shouldParse(),
  ':nth-child(+n)': shouldParse(),

  ':nth-child(even)': shouldParse(),
  ':nth-child(odd)': shouldParse(),

  ':nth-child(50)': shouldParse(),
  ':nth-child(-50)': shouldParse(),
  ':nth-child(+50)': shouldParse(),

  ':nth-child(2n+3)': shouldParse(),
  ':nth-child(2n-3)': shouldParse(),
  ':nth-child(+2n-3)': shouldParse(),
  ':nth-child(-2n+3)': shouldParse(),
  ':nth-child(-2n+ 3)': shouldParse(),
  ':nth-child(-2n+ 3)': shouldParse(),
  ':nth-child(-2n+ 3)': shouldParse(),
  ':nth-child( 2n + 3 )': shouldParseTo(':nth-child(2n + 3)')
}).run();


vows.describe('Negation Selectors').addBatch({
  ':not(foo|bar)': shouldParse(),
  ':not(*|bar)': shouldParse(),

  ':not(foo|*)': shouldParse(),
  ':not(*|*)': shouldParse(),

  ':not(#blah)': shouldParse(),
  ':not(.blah)': shouldParse(),

  ':not([foo])': shouldParse(),
  ':not([foo^="bar"])': shouldParse(),
  ':not([baz|foo~="bar"])': shouldParse(),

  ':not(:hover)': shouldParse(),
  ':not(:nth-child(2n + 3))': shouldParse(),

  // Not technically allowed, but what the heck
  ':not(:not(#foo))': shouldParse(),
  ':not(a#foo.bar)': shouldParse(),
  ':not(#foo .bar > baz)': shouldParse(),
  ':not(h1, h2, h3)': shouldParse()
}).run();


/*
vows.describe('moz Any Selector').addBatch({
  ':-moz-any(h1, h2, h3)': shouldParse(),
  ':-moz-any(.foo)': shouldParse(),
  ':-moz-any(foo bar, .baz > .bang)': shouldParse()
}).run();
*/


vows.describe('Namespaced Selectors').addBatch({
  'foo|E': shouldParse(),
  '*|E': shouldParse(),
  'foo|*': shouldParse(),
  '*|*': shouldParse()
}).run();


/*
  def test_namespaced_attribute_selectors
    assert_selector_parses('[foo|bar=baz]')
    assert_selector_parses('[*|bar=baz]')
    assert_selector_parses('[foo|bar|=baz]')
  end

  def test_comma_selectors
    assert_selector_parses('E, F')
    assert_selector_parses('E F, G H')
    assert_selector_parses('E > F, G > H')
  end

  def test_selectors_with_newlines
    assert_selector_parses("E,\nF")
    assert_selector_parses("E\nF")
    assert_selector_parses("E, F\nG, H")
  end

  def test_expression_fallback_selectors
    assert_selector_parses('0%')
    assert_selector_parses('60%')
    assert_selector_parses('100%')
    assert_selector_parses('12px')
    assert_selector_parses('"foo"')
  end

  def test_functional_pseudo_selectors
    assert_selector_parses(':foo("bar")')
    assert_selector_parses(':foo(bar)')
    assert_selector_parses(':foo(12px)')
    assert_selector_parses(':foo(+)')
    assert_selector_parses(':foo(-)')
    assert_selector_parses(':foo(+"bar")')
    assert_selector_parses(':foo(-++--baz-"bar"12px)')
  end

  def test_selector_hacks
    assert_selector_parses('> E')
    assert_selector_parses('+ E')
    assert_selector_parses('~ E')
    assert_selector_parses('> > E')
    assert_equal <<CSS, render(<<SCSS)
> > E {
a: b; }
CSS
>> E {
a: b; }
SCSS

    assert_selector_parses('E*')
    assert_selector_parses('E*.foo')
    assert_selector_parses('E*:hover')
  end  
  */

