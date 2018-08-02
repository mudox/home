+++
title       = "Site Build Notes"
date        = 2018-07-30T04:39:04+08:00
draft       = true
tags        = ['Site Notes', 'Web']
toc         = 'true'
pinned      = 'true'
description = '''
I am not a professional web developer. I've been building this site in my
casual time as well as learning some basic web skills. Here records my
designing decisions and gains during building the site.
'''
+++

# Tools

__[Hugo]__ is the static site generator I use. It is known as programmer' s
site generator. It renders fast while providing sufficient flexibility for users
to tweak every aspect of the site.

Its live reloading feature reloads currently opened page to immediately reflect
your changes made in the source files. Suppose you have 2
display monitors, one for editor, the other shows the browser ...

__[Neovim] + [Tmux] + [iTerm2]__ provides the "IDE" environment. Hugo does not
require any special web editor or IDE, I accomplished almost all jobs with this
tool combination.

__[FontAwesome]__ provides all the fancy yet free icons in the site.

__[Emmet]__ is a powerful web snippets expander to boost my html writing speed.

__[SCSS]__ is my choose of CSS preprocessor, with [Hugo Pipes] feature automate the
preprocessing.

# Basic Page DOM

I use 3 row layout for article page's base horizontal layout.

1.  Top navigation bar showing site logo and site main menu.
2.  Middle is the main content area.
3.  Bottom is a footer showing site information.

The middle main content area employ 3 column layout, with both sidebar column
fixed in the viewport.

1.  Left sidebar shows
    1.  Article tag list
    2.  Recently updated article list
    3.  Navigation menu
2.  Right sidebar shows table of contents of current article

## Document body

```html
<body>
    <div class="wrapper">
        <header class="header"></header>
        <aside class="sidebar left-sidebar"></aside>
        <aside class="sidebar right-sidebar"></aside>
        <main class="content">
            <!--
                The page's main content area, for example it shows:
                - The paginated article list grouped by month
                - The article content in single page
                - Tag term list in tag terms page
                - Article list in tag article page
                - ...
            -->
        </main>
        <footer class="footer"></footer>
    </div>
</body>
```

## Navigation bar

This area has 2 parts:

1.  Left `<nav>` floats left, show site logo and title.  
    It use flexbox layout to center the logo image and title vertically
    `position: flex; align-item: center;`

2.  Right `<nav>` aligns text to right, shows site main menu.

```html
<nav>
    <!--Align left-->
    <section class="top-navbar-left">
        <a href="">
            <!--Site logo-->
            <img src="" alt="">
        </a>
        <a href="">
            <!--Site title-->
            <h1></h1>
        </a>
    </section>

    <!--Align right-->
    <section class="top-navbar-right">">
        <ul>
            <!--4 menu links-->
            <li>
                <a href="">
                    <i></i>
                    <span></span>
                </a>
            </li>
        </ul>
    <section>
</nav>
```

## Left sidebar

The area is divided into `<section>`s, I add spacing style on them.

```html
<aside class="sidebar left-sidebar">
    <section  class="article-tag-list">
        ...
    </section>
    <section class="pinned-article-list">
        ...
    </section>
    <section class="updated-article-list">
        ...
    </section>
    <section class="stage1">
        <section class="related-article-list">
            ...
        </section>
        <section class="sidebar-menu">
            ...
        </section>
    </section>
</aside>
```

The `.stage` is use for script `nav.js` to alternate the `.related-article-list`
section and `.sidebar-menu` section when user scrolls the page up and down.

Frame of the section:

```html
<header>
    <h2>
        <span></span>
        <i></i>
    </h2>
</header>
<ul>
    <li>
        <a></a>
    </li>
    <!--...-->
</ul>
```

## Right sidebar

Similar to the left sidebar, but with `right-sidebar` class assigned to the top
`<aside>` element.

```html
<aside class="sidebar right-sidebar">
    <header>
        <h2>
            <i></i>
            <span></span>
        </h2>
    </header>
    <nav>
        <!--...-->
    </nav>
</aside>
```

The `nav` element are used to add top margin under header.

## Main content area

```html
<article class="article">

    <!--Left sidebar-->
    <!--Show tag list if any-->
    {{ partial "left-sidebar.html" . }}

    <!--Right sidebar-->
    <!--Show TOC if front matter `toc` is not equal to `false`-->
    {{ partial "right-sidebar.html" . }}

    <!--Title-->
    <h1 class="article-title">{{ .Title }}</h1>

    <!--Date-->
    {{ if eq .Section "post" }}
    <time>
        <span class="article-date">
            {{ .Date.Format "Updated: 2006-01-02"}}
        </span>
    </time>
    {{ end }}

    <!--Article content-->
    {{ with .Description }}
    <blockquote class='article-summary'>{{ . }}</blockquote>
    {{ end }}

    <div class="article-content">
        {{ .Content }}
    </div>

</article>
```

# Content Arrangement

## Sections

There are 3 sections currently.

1.  **Post section** This is the main section of the site, almost all article go under it.

2.  **Project section** All my project introduction and demo articles go under this section.

3.  **Resume section** My resume, it only has a `_index.md` article.

## Taxonomies

For simplicity, I only use tags.

All tag name use normal casing like `iOS`, `Swift` etc.

# Style Sheet

## Code

The site use 3 kinds of code related element:

1. __Inline code__ bare `<code>` embedded with other element like `<p>`
2. __Code box__  block `div.highlighting > pre > code` which can be introduced
   using markdown code fence syntax, or Hugo shortcode `highlight`.
3. __Embedded code media__ like those from [JSFiddle], [CodePen] etc.

# How-To

This section contains the knowledge I've learned during the site building process.

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

# Issues And Solutions

Here are the issues I encountered and the solution I came out.

---

Live reload does not bring the latest change to browser?

Google Chrome -> open __Devtools__ window -> click __Network__ tab -> check
__Disable cache__ box. Keep the window open during the testing.

---

Sometime only the currently opened page got latest change to (e.g. css, js
files ...), if I jump to other pages, reloading page or clear the browser cache
does not work.

Rerun the `hugo server` command with `--gc --cleanDestinationDir=true` switch.

---

The `tags` folder got ignored by git somehow?

Check following files for anywhere mentions `tags`:

1.  `.gitignore` at the project root directory (the path where project's `.git` folder lies).
1.  `.git/info/exclude` just like `.gitignore` but is not tracked by git.
1.  Global ignore file, type `git config --get core.excludesfile` to see it.

---

Why the `line-height` of `pre code` can not be further decreased under certain
limit?

The `line-height` value of containing block element specifies the lower bound
of included inline elements. Set the `line-height` on the wrapping `<pre>`
element instead.

---

The sidebar position adjustment script run weirdly in Safari.

It is a bug of Safari. Disabling scrolling inertia in _Preferences ->
Accessibility -> Mouse & Trackpad -> Trackpad options ... -> Scrolling_
suppresses this bug, but the system scrolling experience is totally changed.

Currently, I added a `isSafari` check [from StackOverflow](https://stackoverflow.com/questions/9847580/how-to-detect-safari-chrome-ie-firefox-and-opera-browser/9851769) in `scrollPanes` function which
immediately return on Safari.

# References

[MDN Web Docs]
[Hugo]

[Hugo]: http://gohugo.io
[Neovim]: https://github.com/neovim/neovim
[Tmux]: https://github.com/tmux/tmux
[iTerm2]: https://www.iterm2.com/
[emmet]: https://emmet.io
[Auto-highlighting TOC]: {{< relref "auto-highlighting-toc.md" >}}
[Fixed Sidebar]: {{< relref "fixed-sidebar.md" >}}
[MDN Web Docs]: https://developer.mozilla.org
[Hugo]: https://gohugo.io
[FontAwesome]: https://fontawesome.com
[SCSS]: https://sass-lang.com
[Hugo Pipes]: https://gohugo.io/hugo-pipes/introduction
[JSFiddle]: jsfiddle.net
[CodePen]: https://codepen.io
