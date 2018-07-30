+++
title       = "Site Build Notes"
date        = 2018-07-30T04:39:04+08:00
draft       = true
tags        = ['Site Notes', 'Web']
toc         = 'true'
description = '''
I am not a professional web developer. Here records all my gains during
building the site.
'''
+++

# Tools

I use the popular static site generator - [Hugo] which is fast as well as
versatile. Its live reloading feature is amazing. Almost all working is done by
a text editor.

All text files are edited in the [Neovim] + [Tmux] + [iTerm 2] combination.

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

Document body layout:

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

Navigation bar layout:

```html
<nav>
    <a class="nav-right" href="">
        <!--my avatar-->
        <img src="" alt="">
        <h1></h1>
    </a>
</nav>
<ul>
    <!--4 menu links-->
    <li>
        <a href="">
            <i></i>
            <span></span>
        </a>
    </li>
</ul>
```

Left sidebar frame:

```html
<aside class="sidebar left-sidebar">
    <section  class="left-sidebar-tag-list">
        <!--tag list partial-->
    </section>
    <section class="left-sidebar-article-list">
        <!--article list partial-->
    </section>
    <section class="left-sidebar-menu">
        <!--menu partial-->
    </section>
</aside>
```

Left sidebar navigation section frame:

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

Right sidebar:

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

Main content area:

```html
<article class="article">

    <!--Left sidebar-->
    <!--Show tag list if any-->
    {{ partial "left-sidebar.html" . }}

    <!--Right sidebar-->
    <!--Show TOC if front matter `toc` not equal to `false`-->
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

There is only 1 section - **post**.

## Taxonomies

For simplicity, I only use tags.

# CSS

# Howto

`margin-left` controls indentation of lists.

[hugo]: http://gohugo.io

[neovim]: https://github.com/neovim/neovim

[tmux]: https://github.com/tmux/tmux

[iterm 2]: https://www.iterm2.com/

[emmet]: https://emmet.io
