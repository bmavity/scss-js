## Selectors

  # Taken from http://www.w3.org/TR/css3-selectors/#selectors
  def test_summarized_selectors
    assert_selector_parses('*')
    assert_selector_parses('E')
    assert_selector_parses('E[foo]')
    assert_selector_parses('E[foo="bar"]')
    assert_selector_parses('E[foo~="bar"]')
    assert_selector_parses('E[foo^="bar"]')
    assert_selector_parses('E[foo$="bar"]')
    assert_selector_parses('E[foo*="bar"]')
    assert_selector_parses('E[foo|="en"]')
    assert_selector_parses('E:root')
    assert_selector_parses('E:nth-child(n)')
    assert_selector_parses('E:nth-last-child(n)')
    assert_selector_parses('E:nth-of-type(n)')
    assert_selector_parses('E:nth-last-of-type(n)')
    assert_selector_parses('E:first-child')
    assert_selector_parses('E:last-child')
    assert_selector_parses('E:first-of-type')
    assert_selector_parses('E:last-of-type')
    assert_selector_parses('E:only-child')
    assert_selector_parses('E:only-of-type')
    assert_selector_parses('E:empty')
    assert_selector_parses('E:link')
    assert_selector_parses('E:visited')
    assert_selector_parses('E:active')
    assert_selector_parses('E:hover')
    assert_selector_parses('E:focus')
    assert_selector_parses('E:target')
    assert_selector_parses('E:lang(fr)')
    assert_selector_parses('E:enabled')
    assert_selector_parses('E:disabled')
    assert_selector_parses('E:checked')
    assert_selector_parses('E::first-line')
    assert_selector_parses('E::first-letter')
    assert_selector_parses('E::before')
    assert_selector_parses('E::after')
    assert_selector_parses('E.warning')
    assert_selector_parses('E#myid')
    assert_selector_parses('E:not(s)')
    assert_selector_parses('E F')
    assert_selector_parses('E > F')
    assert_selector_parses('E + F')
    assert_selector_parses('E ~ F')
  end

  # Taken from http://www.w3.org/TR/css3-selectors/#selectors,
  # but without the element names
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

