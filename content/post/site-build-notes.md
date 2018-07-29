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

# Basic Page DOM

Vertically divided into 3 rows:

1. Top navigation bar showing site logo and site main menu.
1. Middle is the main content area.
1. Bottom is a footer showing site information.

The main content area are divide horizontally into 3 columns:

1. Left sidebar shows
    1. Article tag list
    1. Recently updated article list
    1. Navigation menu
1. Right sidebar shows table of contents of current article

Document body layout:

```html
<body>
    <div class="wrapper">
        <header class="header"></header>
        <aside class="sidebar left-sidebar"></aside>
        <aside class="sidebar right-sidebar"></aside>
        <main class="content"></main>
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

## Sidebars

## Homepage

## Article page

# Content Arrangement

## Sections

There is only 1 section - __post__.

## Taxonomies

For simplicity, I only use tags.

# CSS

# Howto

`margin-left` controls indentation of lists.

[Hugo]: http://gohugo.io
[Neovim]: https://github.com/neovim/neovim
[Tmux]: https://github.com/tmux/tmux
[iTerm 2]: https://www.iterm2.com/
[Emmet]: https://emmet.io
