+++
title = "Theme Demo"
date  = 2018-07-26T19:00:55+08:00
draft = true
tags  = ['Demo', 'Markdown', 'Web']
toc   = 'true'
+++

Page to showcase the theme backing this site.
Also for testing purpose.
<!--more-->

# Heading #1

The world’s fastest framework for building websites

Hugo is one of the most popular open-source static site generators. With its
amazing speed and flexibility, Hugo makes building websites fun again.

## Heading #2

Nam pretium faucibus ipsum, sit amet tincidunt augue vulputate nec. Donec
consectetur sit amet justo vel vehicula. Fusce quis tempor felis. Maecenas
viverra pulvinar sodales. Cras a hendrerit libero. Sed imperdiet non mauris
luctus facilisis. Duis at tortor id est lacinia egestas eu eget elit. Mauris
dapibus augue ac maximus fermentum. Maecenas consectetur ligula eget egestas
rutrum. Mauris tempor pellentesque odio, vel ornare ex rhoncus ac. Donec
consectetur pulvinar ante, sed elementum mi consectetur id. Donec at turpis sit
amet mauris tempus congue.

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

Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."
"There is no one who loves pain itself, who seeks after it and wants to have
it, simply because it is pain..."
"

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

Use shortcode ` { { < highlight >  } }`, turn on line number with custom start
number, and line highlighting.

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
{{< / highlight >}}

## Python

```Python
import os, sys
from . import util

func foo():
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
| normal text     | *emphasis*            | **strong text** |
| `inlined code`  | <u>underline text</u> | [link](#)       |
| ~~strike line~~ | Cell                  | Cell            |
| normal text     | *emphasis*            | **strong text** |
| `inlined code`  | <u>underline text</u> | [link](#)       |
| ~~strike line~~ | Cell                  | Cell            |

Use markdown to control cell text alignment.

| Default aligned | Centered      | Right-aligned  |
| :-------------- |:-------------:| --------------:|
| col 3 is        | right-aligned | $1600          |
| col 2 is        | centered      |   $12          |
| zebra stripes   | are neat      |    $1          |

# Link

[I'm an inline-style link](https://www.google.com)

[I'm an inline-style link with title](https://www.google.com "Google's Homepage")

[I'm a reference-style link][Arbitrary case-insensitive reference text]

[I'm a relative reference to a repository file](../blob/master/LICENSE)

[You can use numbers for reference-style link definitions][1]

Or leave it empty and use the [link text itself].

URLs and URLs in angle brackets will automatically get turned into links.
http://www.example.com or <http://www.example.com> and sometimes
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
boy let's keep writing to make sure this is long enough to actually wrap for
everyone. Oh, you can *put* **Markdown** into a blockquote.

# Other

Below is a `<hr>`

***

Below is another `<hr>`

A Youtube video?

<iframe width="560" height="315"
  src="https://www.youtube.com/embed/Z2Uu2rYFlPQ?rel=0"
  frameborder="0" allow="autoplay; encrypted-media"
  allowfullscreen></iframe>

---

