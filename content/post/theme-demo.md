+++
title       = "Theme Demo"
date        = 2017-12-07T19:00:55+08:00
draft       = true
tags        = ['Demo', 'Markdown', 'Web']
toc         = 'true'
pinned      = 'true'
description = '''
Page to showcase the theme backing this site. Also for testing purpose.
'''
+++

# Heading #1

The world’s fastest framework for building websites

Hugo is one of the most popular open-source static site generators. With its
amazing speed and flexibility, Hugo makes building websites fun again.

## Heading #2

Nam pretium faucibus ipsum, sit amet tincidunt augue vulputate nec. Donec
consectetur sit amet justo vel vehicula. Fusce quis tempor felis. Maecenas
viverra pulvinar sodales. Cras a hendrerit libero. Sed imperdiet non mauris
luctus facilisis.\
Duis at tortor id est lacinia egestas eu eget elit. Mauris dapibus augue ac
maximus fermentum. Maecenas consectetur ligula eget egestas rutrum. Mauris
tempor pellentesque odio, vel ornare ex rhoncus ac. Donec consectetur pulvinar
ante, sed elementum mi consectetur id.\
Donec at turpis sit amet mauris tempus
congue.

Nulla facilisi. Sed arcu tellus, volutpat et sollicitudin eget, varius in
metus. Vestibulum hendrerit eu arcu a maximus. Nam arcu metus, laoreet in
ligula pharetra, euismod rutrum urna. Vestibulum vel faucibus dui. Curabitur
facilisis vehicula ex. Integer nec ligula convallis, dapibus erat vitae,
ultricies quam. Maecenas sit amet massa ultricies, faucibus quam vitae,
ultrices turpis.

### Heading #3

Nam non pharetra lectus, gravida lacinia eros. Ut eleifend enim pulvinar est
luctus posuere non id leo. Vivamus nibh libero, rutrum eu pretium ac,
scelerisque ac risus. Fusce aliquam porta elementum. Quisque non nisi at nisl
facilisis porttitor iaculis eu sapien. Ut congue lacinia posuere. Proin
facilisis metus sed diam commodo tristique.

#### Heading #4

Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur,
adipisci velit..." "There is no one who loves pain itself, who seeks after it
and wants to have it, simply because it is pain..."

# Lists

Ordered list

1.  **Strong Title** immediately followed by text\
    Nam non pharetra lectus, gravida lacinia eros. Ut eleifend enim pulvinar
    est luctus posuere non id leo. Vivamus nibh libero, rutrum eu pretium ac,
    scelerisque ac risus. Fusce aliquam porta elementum. Quisque non nisi at
    nisl facilisis porttitor iaculis eu sapien. Ut congue lacinia posuere.
    Proin

    1.  Ordered list #1 with DOM strucure `ul>li*2`
    2.  Ordered list #2 with DOM strucure `ul>li*2`

2.  _Itatic Title_ followed by lines
      ipsum quia dolor sit amet, consectetur
      ipsum dolor sit amet, consectetur
      ipsum quia dolor

    -   Unordered list #1 with each `<li>` wrapped within a `<p>`
        DOM structure: `ul>(li>p)*2`

    -   Unordered list #2 with each `<li>` wrapped within a `<p>`
        DOM structure: `ul>(li>p)*2`

3.  Ordered list #1

4.  Ordered list #2

Unordered list

-   **Strong Title** immediately followed by text
    Nam non pharetra lectus, gravida lacinia eros. Ut eleifend enim pulvinar
    est luctus posuere non id leo. Vivamus nibh libero, rutrum eu pretium ac,
    scelerisque ac risus. Fusce aliquam porta elementum. Quisque non nisi at
    nisl facilisis porttitor iaculis eu sapien. Ut congue lacinia posuere.
    Proin

    1.  Ordered list #1
    2.  Ordered list #2

-   _Itatic Title_ followed by lines
    ipsum quia dolor sit amet, consectetur
    ipsum dolor sit amet, consectetur
    ipsum quia dolor

    -   Unordered list #1
    -   Unordered list #2


-   Unordered list #1

-   Unordered list #2

# Code

Inline code `<code>` embeded in normal text lines.

## Swift

Use standard code fence markdown syntax.

```swift
import RxSwift
import RxCocoa

let observable = Driver.just(1)
  .flatMap { num -> Driver<Bool> in
    return validate(num)
  }
  .flatMap { num -> Driver<String> in
    return request(num)
  }
  .flatMap { num -> Driver<()> in
    return postValidate(num)
  }
```

## Javascript

Use shortcode `highlight`, turn on line number with custom start number, and
line highlighting.

{{< highlight javascript "linenos=inline,hl_lines=3 8-12,linenostart=199" >}}
$(document).ready(function() {
  $(window).scroll(function() {
    $("#TableOfContents a").removeClass("current")
    currentAnchor().addClass("current")
  })
});

function tocItem(anchor) {
  return $("[href=\"" + anchor + "\"]")
}

function heading(anchor) {
  return $("[id=" + anchor.substr(1) + "]")
}
{{< /highlight >}}

## Python

```Python
import os, sys
from . import util

def foo():
    for x in range(1, 101):
	start_index_fizz = (x % 3) * 4
	f = "fizz"[start_index_fizz::]
	start_index_buzz = (x % 5) * 4
	b = "buzz"[start_index_buzz::]
	print ((f + b) or x)
```

## Go

```go
// GetTitleFunc returns a func that can be used to transform a string to
// title case.
//
// The supported styles are
//
// - "Go" (strings.Title)
// - "AP" (see https://www.apstylebook.com/)
// - "Chicago" (see http://www.chicagomanualofstyle.org/home.html)
//
// If an unknown or empty style is provided, AP style is what you get.
func GetTitleFunc(style string) func(s string) string {
  switch strings.ToLower(style) {
  case "go":
    return strings.Title
  case "chicago":
    tc := transform.NewTitleConverter(transform.ChicagoStyle)
    return tc.Title
  default:
    tc := transform.NewTitleConverter(transform.APStyle)
    return tc.Title
  }
}
```

# Table

| Head Column #1  | Head Column #2        | Head Column #3  |
| --------------- | --------------------- | --------------- |
| normal text     | _emphasis_            | **strong text** |
| `inlined code`  | <u>underline text</u> | [link](#)       |
| ~~strike line~~ | Cell                  | Cell            |
| normal text     | _emphasis_            | **strong text** |
| `inlined code`  | <u>underline text</u> | [link](#)       |
| ~~strike line~~ | Cell                  | Cell            |

Use markdown to control cell text alignment.

| Default aligned |    Centered   | Right-aligned |
| :-------------- | :-----------: | ------------: |
| col 3 is        | right-aligned |         $1600 |
| col 2 is        |    centered   |           $12 |
| zebra stripes   |    are neat   |            $1 |

# Link

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../blob/master/LICENSE)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links.
<http://www.example.com> or <http://www.example.com> and sometimes
example.com (but not on Github, for example).

Some text to show that the reference links can follow later.

[arbitrary case-insensitive reference text]: https://www.mozilla.org

[1]: http://slashdot.org

[link text itself]: http://www.reddit.com

# Blockquotes

> Blockquotes are very handy in email to emulate reply text.
> This line is part of the same quote.

Quote break.

> This is a very long line that will still be quoted properly when it wraps. Oh
> boy let's keep writing to make sure this is long enough to actually wrap for
> everyone. Oh, you can _put_ **Markdown** into a blockquote.
>
> This is a very long line that will still be quoted properly when it wraps. Oh
> boy let's keep writing to make sure this is long enough to actually wrap for
> everyone. Oh, you can _put_ **Markdown** into a blockquote.

# Shortcodes

## Youtube

Use the `youtube` shortcode.

<div class="embded-media-box">
{{< youtube id="Z2Uu2rYFlPQ" autoplay="false" >}}
</div>

## Cross reference

**Click** the URLs to check if the shortcode works.

-   [Absolute permalink to: Unburden View Controllers]({{< ref "/post/unburden-view-controllers.md" >}})

-   [Relative permalink to: Unburden View Controllers]({{< relref "unburden-view-controllers.md" >}})

# Embeding

## CodePen code

<div class="embded-media-box">
<p data-height="275" data-theme-id="0" data-slug-hash="BPJdar" data-default-tab="css,result" data-user="mudox" data-pen-title="BPJdar" data-preview="true" class="codepen">See the Pen <a href="https://codepen.io/mudox/pen/BPJdar/">BPJdar</a> by Mudox (<a href="https://codepen.io/mudox">@mudox</a>) on <a href="https://codepen.io">CodePen</a>.</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
</div>

Compare with locally rendered code box using code fence syntax. Left and
rigtht sides are aligned to the local code box.

```Python
import os, sys
from . import util

def foo():
    for x in range(1, 101):
	start_index_fizz = (x % 3) * 4
	f = "fizz"[start_index_fizz::]
	start_index_buzz = (x % 5) * 4
	b = "buzz"[start_index_buzz::]
	print ((f + b) or x)
```

## JSFiddle code

Left and rigtht sides are aligned to the local code box.

<div class="embded-media-box">
<script async src="//jsfiddle.net/Mudox/97zp4cry/embed/html,css,result/dark/"></script>
</div>
