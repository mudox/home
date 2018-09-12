+++
title       = "iOS Dev Q&A"
date        = 2018-08-25T20:57:08+08:00
draft       = true
tags        = ['Xcode']
toc         = 'true'
pinned      = 'false'
description = '''
Collects issues and solution I came across when developing in Xcode.
'''
+++

# Uncategorized

Mix `String` and `NSString` in `NSRegularExpression` methods is error prone.

`String` use __UTF8__ coding (it see characters with variable lengths) while
`NSString` uses __UTF16__  behind (it sees characters all occupying 2 bytes).

For example, an emoji character counts as 2 UTF16 code points in `NSString`, but
count as 1 Unicode EGC (Extended Grapheme Cluster)code point in `String`.

```swift
let s = "🌹"
s.count        // 1

let ss = s as NSString
ss.length      // 2
```

Hence when matching

```swift
let text: String = ...

let regex = ...

let msgMatch = msgRegex.firstMatch(
  in: newText,
  options: [],
  range: NSMakeRange(0, text.length)                  // WRONG
  range: NSMakeRange(0, (text as NSString).length)    // RIGHT
)!

// WRONG
let captured = text.substring(with: msgMatch.range(at: 2))
// RIGHT
let captured = (text as NSString).substring(with: msgMatch.range(at: 2))
```

About `Swift.Range` and `NSRange` see this
[SO](https://stackoverflow.com/questions/25138339/nsrange-to-rangestring-index)
article.

---

Use the `KeyPath` version of KVO after Swift 4, Xcode panics with:

> fatal error: Could not extract a String from KeyPath Swift.ReferenceWritableKeyPath ...

Add `@objcMember` to the KVO'ed class, or add `@objc` to KVO'ed property.

{{< highlight swift "linenos=inline,hl_lines=2" >}}
class B: NSObject {
  @objc dynamic var value = "a"
}

let keyPath = ...
b.observe(keyPath, options: [.new, .old, .prior, .initial]) { value, change in
  if change.kind == .setting {
    dump(object)
    dump(change)
  }
}
{{< /highlight >}}

When declare `CodingKeys` for nested types Xcode panics with:

> Ambiguous reference to CodingKeys,

Declare it as private `private enum CodingKeys: CodingKey, String`




# Xcode

When trying to run app in real device, Xcode alerts with:

> Could not connect to ...

- Check if airline mode is on, turn off if yes and re-run the app.

---
