+++
title       = "Site Building - Notes"
date        = 2018-07-30T04:39:04+08:00
draft       = true
tags        = ['Web', 'HTML', 'CSS', 'JavaScript']
series      = ['Site Building']
toc         = 'true'
pinned      = 'true'
description = '''
I am not a professional web developer. I've been building this site in my
casual time as well as learning some basic web skills. Here records my
designing decisions and gains during building the site.
'''
+++




# Tooling

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

__[TOML]__ is the format I used in site and page content configuration.




# DOM

## Homepage

Currently it use the same base layout as single article page below, except
without the 2 sidebar column in middle area.

The main content area only shows a article list grouped by updated month.

## Single article page

I use 3 row layout for article page's base horizontal layout.

1. __Top__ navigation bar showing site logo and site main menu.\
1. __Middle__ the main content area.\
1. __Bottom__ footer showing site information.

The middle main content area emploies 3 column layout, with both sidebar
columns fixed in the viewport.

1. __Left sidebar__ shows:

    1.  Article tag list
    2.  Recently updated article list
    3.  Site main menu
    4.  Related article list (See Also)

1. __Right sidebar__ shows table of contents of current article

The main menu section is dynamically positioned. If the right sidebar TOC is
too short than the left sidebar tag list and recently updated article list
combined, show main menu statically under the TOC. else anternate the site main
menu with left sidebar 3rd section.

I use [Base Templates and Blocks] feature from Hugo to construct my single page
template:

```html
<body>
    <div class="frame">

        <!--Top navbar-->
        <header class="frame-header">
            {{ partial "top-navbar.html" . }}
        </header>

        <!--Middle main content area-->
        <div class="main-frame">
            {{ block "main" . }}
            {{ end }}
        </div>

        <!--Bottom site footer-->
        <footer class="frame-footer">
            {{ partial "bottom-navbar.html" . }}
        </footer>

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

    <div class="article-body">
        {{ .Content }}
    </div>

</article>
```

# Content

## Sections

There are 3 sections currently.

1.  **Post section** This is the main section of the site, almost all article go under it.

2.  **Project section** All my project introduction and demo articles go under this section.

3.  **Resume section** My resume, it only has a `_index.md` article.

## Taxonomies

There are 2 kinds of taxonomies in my site:

1. __Tags__ All posts must have at least one tag, the default tags is
   __Untagged__ which is assigned by Hugo archetype at creation of the post
   content file.

2. __Series__ Series means a more tight relationship between articles. It is
   optional, often I split a growing article into several related articles, then
   I mark them as in the same series. E.g. _Site Buiding_ series, _Awesome
   Lists_ series.

All taxonomy names use normal casing like `iOS`, `Swift` etc.




# Style Sheet

## Fonts

I only use 2 fonts for this site

1. __Merriweather__ for all cases except code.

1. __Roboto Mono__ for code text.

All font related styles are specified collectively in `_fonts.scss`.

## Code

The site use 3 kinds of code related element:

1. __Inline code__ bare `<code>` embedded with other element like `<p>`
2. __Code box__  block `div.highlighting > pre > code` which can be introduced
   using markdown code fence syntax, or Hugo shortcode `highlight`.
3. __Embedded code media__ like those from [JSFiddle], [CodePen] etc.




# Configurations

Hugo provides 2 configurable levels for users to flexibly tweak aspects of
their sites. Hugo also let user to choose his preferred configuration data
format among [JSON], [YAML], [TOML]. I use TOML.

## Site level configuration

Hugo requires my site level configuration stays in `config.toml` under the root
path of site.

### Code highlighting

I use the server side solution - [Chroma] which is recommanded by Hugo. See
[Syntax Highlighting] for details.

I use predefined theme `pygmentsStyle = "dracula"`. For completely customzation
of the highlighted appearance, set `pygmentsUseClasses` instead of
`pygmentsStyle` then follow [Generate Syntax Highlighter CSS] to get the
initial CSS file to begin with the customization.

### Related article list

This section of configuration controls the algorithm that hugo uses to
generates related file list for each content page.

Currently the taxonomy series take the highest priority to in computing related
file weight then the tags, then the article title ...

### Menu



## Content level configuration

---

# References

[MDN Web Docs]
[Hugo]

[Hugo]: http://gohugo.io
[Neovim]: https://github.com/neovim/neovim
[Tmux]: https://github.com/tmux/tmux
[iTerm2]: https://www.iterm2.com/
[emmet]: https://emmet.io
[MDN Web Docs]: https://developer.mozilla.org
[Hugo]: https://gohugo.io
[FontAwesome]: https://fontawesome.com
[SCSS]: https://sass-lang.com
[JSFiddle]: jsfiddle.net
[CodePen]: https://codepen.io
[line-height | MDN]: https://developer.mozilla.org/en-US/docs/Web/CSS/line-height#Values
[JSON]: http://www.json.org
[YAML]: http://yaml.org
[TOML]: https://github.com/toml-lang/toml
[Syntax Highlighting]: https://gohugo.io/content-management/syntax-highlighting/#highlight-in-code-fences
[Chroma]: https://github.com/alecthomas/chroma
[Generate Syntax Highlighter CSS]: https://gohugo.io/content-management/syntax-highlighting/#generate-syntax-highlighter-css
[Base Templates and Blocks]: https://gohugo.io/templates/base
