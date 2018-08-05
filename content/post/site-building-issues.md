+++
title       = "Site Building - Issues"
date        = 2018-04-05T22:09:44+08:00
draft       = true
tags        = ['Web', 'HTML', 'CSS', 'JavaScript']
series      = ['Site Building']
toc         = 'true'
pinned      = 'false'
description = '''
Here are the issues I encountered during the process of building this site and
the solutions I came out.
'''
+++

# Uncategorised

## 2018-08

Live reloading does not bring the latest change to browser?

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

---

Hugo server failed generating the site with error log __unexpected EOF__.

It is usually due to the hugo template parser did not finish parsing the target
template file, on such case I often check the source template file to see if
there is unbalanced `{{ end }}`. For example missing `{{ end }}` for `{{ block
"main" . }}` ...

---

Reducing `line-hegiht` of some elements deep in the document DOM has no effect
under certain limit.

As stated on [line-height | MDN], ancestor block element's `line-height` set a
lower bound for descendant elements. And the suggested value form is `<number>`
(without any following units).

Use browser element inspector to `line-height` inheritance relationship that
prevents your to reduce it.

My strategy is to set a lowest value (e.g. 1) at `<html>` element, then set
effective value in elements as deep in the DOM as possible.

Content.
