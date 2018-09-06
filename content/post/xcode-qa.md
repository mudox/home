+++
title       = "iOS Dev Issues"
date        = 2018-08-25T20:57:08+08:00
draft       = true
tags        = ['Xcode']
toc         = 'true'
pinned      = 'false'
description = '''
Collects issues and solutinon I came across when developing in Xcode.
'''
+++

# Uncategorized

When try to run app in real device, Xcode alerts:

> Could not connect to ...

Check if airline mode is on, turn off if yes and re-run the app.

---

Use the `KeyPath` version of KVO after Swift 4, Xcode spits out:

> fatal error: Could not extract a String from KeyPath Swift.ReferenceWritableKeyPath ...

Add `@objcMember` to the KVO'ed class, or add `@objc` to specific property.

```swift
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
```
