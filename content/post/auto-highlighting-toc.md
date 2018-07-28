+++
title       = "Auto Highlighting Toc"
date        = 2018-07-28T08:45:42+08:00
draft       = true
tags        = ['Web', 'JavaScript', 'Snippets']
toc         = 'true'
description = '''
HowTo: highlight current title in TOC (Table Of Contents) as the main article
scrolls.
'''
+++

# Before Everything

The static site generator [Hugo] I used in for this site auto-generates [TOC]
for each article. The rendered TOC html DOM structure is like:

It basically scans the article body part for headings (`h1 h2 h3 h4 ...`), each
of which was rendered with an `id` attribute. For each heading Hugo adds a `li`
item in TOC at appropriate level.

```html
<aside class="aside-pane right-pane">
    <header>
        <h2>
            <i class="fas fa-list"></i>
            <span>CONENTS</span>
        </h2>
    </header>
    <nav id="TableOfContents">
        <ul>
            <!--...-->
            <li><a href="#data">Heading 1</a>
                <ul>
                    <li><a href="#realm">Heading 1.1</a></li>
                    <li><a href="#realm">Heading 1.2</a></li>
                    <!--...-->
                </ul>
            </li>
            <!--...-->
        </ul>
    </nav>
</aside>
```

# Steps

1. Scan the TOC collecting all anchors like `#realm` in `<a href="realm">`.  
   For an anchor like `#realm` there must be only one instance of element with
   `"realm"` as its `id` attribute.

1. Scan for `$('[id=' + anchorName + ']')` part for heading elements
   corresponding to items listed in TOC.

1. Collect their top x coordinate using `$(...).offset.top`.  
   Make a mapping like `{ anchorName: headingOffset }`.

1. Add an event handler `$(window).scroll(function() { ... })`.  
   When window scrolls, get the `window.pageYOffset` and traverse the mapping
   collected above to found the closest heading that is beyond the window
   viewport offset.

1. Highlight the corresponding `<li>` element in TOC by
   '$(...).addClass('current')'.

# Full code

```javascript
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

var _anchors = null
function anchors() {
  if (!_anchors) {
    _anchors = $("#TableOfContents a").map(function() {
      return $(this).attr("href")
    })
  }
  return _anchors
}

function currentAnchor() {
  var winY = window.pageYOffset
  var currAnchor = null
  anchors().each(function() {
    var y = heading(this).position().top
    if (y < winY + window.innerHeight * 0.23) {
      currAnchor = this
      return
    }
  })
  return tocItem(currAnchor)
}
```

[TOC]: https://en.wikipedia.org/wiki/Table_of_contents
[Hugo]: http://gohugo.io
