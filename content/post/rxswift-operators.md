+++
title = "Rxswift Operators"
date  = 2018-07-26T19:00:55+08:00
draft = true
tags  = ['RxSwift', 'iOS']
toc   = 'true'
+++

Introduction of versatile RxSwift operators library.
<!--more-->

Use `Driver` triats and `flatMap` operator.

```swift
import RxSwift
import RxCocoa

let observable = Driver.just(1)
  .flatMap { num -> Driver<Bool> in
    return validate(num)
  }
  .flatMap { num -> Driver<String> in
    return request(num)
  }
  .flatMap { num -> Driver<()> in
    return postValidate(num)
  }
```
