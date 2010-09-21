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

vows.describe('CSS Selector grammar').addBatch({
// Selectors

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

  // Taken from http://www.w3.org/TR/css3-selectors/#selectors,
  // but without the element names
  /*
  def test_lonely_selectors
    assert_selector_parses('[foo]')
    assert_selector_parses('[foo="bar"]')
    assert_selector_parses('[foo~="bar"]')
    assert_selector_parses('[foo^="bar"]')
    assert_selector_parses('[foo$="bar"]')
    assert_selector_parses('[foo*="bar"]')
    assert_selector_parses('[foo|="en"]')
    assert_selector_parses(':root')
    assert_selector_parses(':nth-child(n)')
    assert_selector_parses(':nth-last-child(n)')
    assert_selector_parses(':nth-of-type(n)')
    assert_selector_parses(':nth-last-of-type(n)')
    assert_selector_parses(':first-child')
    assert_selector_parses(':last-child')
    assert_selector_parses(':first-of-type')
    assert_selector_parses(':last-of-type')
    assert_selector_parses(':only-child')
    assert_selector_parses(':only-of-type')
    assert_selector_parses(':empty')
    assert_selector_parses(':link')
    assert_selector_parses(':visited')
    assert_selector_parses(':active')
    assert_selector_parses(':hover')
    assert_selector_parses(':focus')
    assert_selector_parses(':target')
    assert_selector_parses(':lang(fr)')
    assert_selector_parses(':enabled')
    assert_selector_parses(':disabled')
    assert_selector_parses(':checked')
    assert_selector_parses('::first-line')
    assert_selector_parses('::first-letter')
    assert_selector_parses('::before')
    assert_selector_parses('::after')
    assert_selector_parses('.warning')
    assert_selector_parses('#myid')
    assert_selector_parses(':not(s)')
  end

  def test_attribute_selectors_with_identifiers
    assert_selector_parses('[foo~=bar]')
    assert_selector_parses('[foo^=bar]')
    assert_selector_parses('[foo$=bar]')
    assert_selector_parses('[foo*=bar]')
    assert_selector_parses('[foo|=en]')
  end

  def test_nth_selectors
    assert_selector_parses(':nth-child(-n)')
    assert_selector_parses(':nth-child(+n)')

    assert_selector_parses(':nth-child(even)')
    assert_selector_parses(':nth-child(odd)')

    assert_selector_parses(':nth-child(50)')
    assert_selector_parses(':nth-child(-50)')
    assert_selector_parses(':nth-child(+50)')

    assert_selector_parses(':nth-child(2n+3)')
    assert_selector_parses(':nth-child(2n-3)')
    assert_selector_parses(':nth-child(+2n-3)')
    assert_selector_parses(':nth-child(-2n+3)')
    assert_selector_parses(':nth-child(-2n+ 3)')

    assert_equal(<<CSS, render(<<SCSS))
:nth-child(2n + 3) {
a: b; }
CSS
:nth-child( 2n + 3 ) {
a: b; }
SCSS
  end

  def test_negation_selectors
    assert_selector_parses(':not(foo|bar)')
    assert_selector_parses(':not(*|bar)')

    assert_selector_parses(':not(foo|*)')
    assert_selector_parses(':not(*|*)')

    assert_selector_parses(':not(#blah)')
    assert_selector_parses(':not(.blah)')

    assert_selector_parses(':not([foo])')
    assert_selector_parses(':not([foo^="bar"])')
    assert_selector_parses(':not([baz|foo~="bar"])')

    assert_selector_parses(':not(:hover)')
    assert_selector_parses(':not(:nth-child(2n + 3))')

    # Not technically allowed, but what the heck
    assert_selector_parses(':not(:not(#foo))')
    assert_selector_parses(':not(a#foo.bar)')
    assert_selector_parses(':not(#foo .bar > baz)')
    assert_selector_parses(':not(h1, h2, h3)')
  end

  def test_moz_any_selector
    assert_selector_parses(':-moz-any(h1, h2, h3)')
    assert_selector_parses(':-moz-any(.foo)')
    assert_selector_parses(':-moz-any(foo bar, .baz > .bang)')
  end

  def test_namespaced_selectors
    assert_selector_parses('foo|E')
    assert_selector_parses('*|E')
    assert_selector_parses('foo|*')
    assert_selector_parses('*|*')
  end

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
}).run();
