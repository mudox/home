+++
title       = "Site Build Notes"
date        = 2018-07-30T04:39:04+08:00
draft       = true
tags        = ['Site Notes', 'Web']
toc         = 'true'
pinned      = 'true'
description = '''
I am not a professional web developer. I will keep building this site in my
casual time as well as learning some basic web skills as much as I could. Here
records my designing decisions and gains during building the site.
'''
+++

# Tools

I use the popular static site generator - [Hugo] which is known as programmer'
s site generator. It renders site fast as well as provides rich set of
flexibility for user to tweak every aspect of the site.

Hugo's live reloading feature reload currently opened site page to show how
your changes in the source files would affect the page. Suppose you have 2
display monitors, one for editor, the other shows the browser ...

Hugo does not require any special web editor or IDE, I accomplished almost all
job with the [Neovim] + [Tmux] + [iTerm 2] combination.

[Emmet] is a powerful web snippets expander to boost my html writing speed.

Code formatter

# Basic Page DOM

Vertically divided into 3 rows:

1.  Top navigation bar showing site logo and site main menu.
2.  Middle is the main content area.
3.  Bottom is a footer showing site information.

The main content area are divide horizontally into 3 columns:

1.  Left sidebar shows
    1.  Article tag list
    2.  Recently updated article list
    3.  Navigation menu
2.  Right sidebar shows table of contents of current article

## Document body frame

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

## Navigation bar layout

This area has 2 parts:

1.  Left `<nav>` floats left, show site logo and title.  
    It use flexbox layout to center the logo image and title vertically
    `position: flex; align-item: center;`

2.  Right `<nav>` aligns text to right, shows site main menu.

```html
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
```

## Left sidebar frame

The area is divided into `<section>`s, I add spacing style on them.

```html
<aside class="sidebar left-sidebar">
    <section  class="left-sidebar-tag-list">
        <!--tag list partial-->
    </section>
    <section class="left-sidebar-article-list">
        <!--article list partial-->
    </section>
    <section class="sidebar-menu">
        <!--menu partial-->
    </section>
</aside>
```

### Section frame

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
    {{.TableOfContents}}
</aside>
```

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

1.  **Post section** This is the main seciton of the site, almost all article go under it.

2.  **Project section** All my project introduction and demo articles go under this section.

3.  **Resume section** My resume, it only has a `_index.md` article.

## Taxonomies

For simplicity, I only use tags.

All tag name use normal casing like `iOS`, `Swift` etc.

# Howtos

This section contains some implementation details of componets of the sites.

<i class='fas fa-question fa-fw'></i>
How to style a `<hr>`\
<i class='fas fa-lightbulb fa-fw'></i>
The horzontal ruler element is just a block element element with no inner content
(text). By default, their `border-bottom` is styled in be a 1px solid black
line.

<i class='fas fa-question fa-fw'></i>
How to controls indentation of `<ul>`, `<ol>` lists?\
<i class='fas fa-lightbulb fa-fw'></i>
Change their `padding-left` CSS property.

<i class='fas fa-question fa-fw'></i>
How to hightlight cooresponding item in the TOC when viewports scrolling.\
<i class='fas fa-lightbulb fa-fw'></i>
See article [Auto-highlighting TOC].

<i class='fas fa-question fa-fw'></i>
How to implement fixed sidebar that stay within the viewport while the main area is scrolls?\
<i class='fas fa-lightbulb fa-fw'></i>
See article [Fixed Sidebar].

<i class='fas fa-question fa-fw'></i>
How to resize embeded medias, like YouTube video, JSFiddle and CodePen code box?\
<i class='fas fa-lightbulb fa-fw'></i>
Wrap each of them into `<div class="embded-media-box">`. For example:

```html
<div class="embeded-media-box">
    <script async src="//jsfiddle.net/Mudox/97zp4cry/embed/html,css,result/dark/"></script>
</div>
```

# References

[MDN Web Docs]

[hugo]: http://gohugo.io
[neovim]: https://github.com/neovim/neovim
[tmux]: https://github.com/tmux/tmux
[iterm 2]: https://www.iterm2.com/
[emmet]: https://emmet.io
[Auto-highlighting TOC]: {{< relref "auto-highlighting-toc.md" >}}
[Fixed Sidebar]: {{< relref "fixed-sidebar.md" >}}
[MDN Web Docs]: https://developer.mozilla.org
