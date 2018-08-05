+++
title       = "Site Building - Howtos"
date        = 2018-04-17T22:09:38+08:00
draft       = true
tags        = ['Web', 'HTML', 'CSS', 'JavaScript']
series      = ['Site Building']
toc         = 'true'
pinned      = 'false'
description = '''
My gains from building this personal site.
'''
+++

# Uncategorised

## 2018-08

How control word casing?

Use `text-transform: [capitalize|uppercase|lowercase|...]` to control text
casing. Better render the text in all lowercase from template.

The `text-transform` property should be applied to the immediate containing
element the text.

---

How to style a `<hr>`

The horizontal ruler element is just a ordinary block element with no inner content
(text). By default, their `border-bottom` is styled in be a `1px solid black`
line.

---

How to controls indentation of `<ul>`, `<ol>` lists?

Change their `padding-left` CSS property.

---

How to highlight corresponding item in the TOC when viewport scrolling.

See article [Auto-highlighting TOC].

---

How to implement fixed sidebar that stay within the viewport while the main area is scrolls?

See article [Fixed Sidebar].

---

How to align the sides of embedded medias, like YouTube video, JSFiddle and
CodePen code box to native code box?

Wrap each of them into `<div class="embedded-media-box">`. For example:

```html
<div class="embedded-media-box">
    <script async src="//jsfiddle.net/Mudox/97zp4cry/embed/html,css,result/dark/"></script>
</div>
```
---

How to speed up page loading?

Use [Hugo Pipes] to minify and bundle assets which can reduces the size of data
transferred as well as the number of requests.

---

How to test site on Microsoft Edge browser on macOS?

Suppose your hosting macOS was assigned IP address '192.168.0.100', and `hugo
server` use port number '1313'.

1. Install [Parallel Desktop.app].

1. In 'Install Assistant' interface, choose 'Free Systems -> Modern.IE Test
   Environment -> Microsoft Edge on Windows 10'  option, which would install a
   trivial version of Windows 10 operating system with Edge browser installed.

1. Re-run `hugo server` command with option `--bind='192.168.0.100'
   --baseURL='192.168.0.100'`.

1. Open `http://192.168.0.100:1313` in the Edge browser.
