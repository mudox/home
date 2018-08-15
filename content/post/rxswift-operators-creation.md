+++
title       = "RxSwift Operators - Creation"
date        = 2018-08-10T16:36:06+08:00
draft       = true
tags        = ['Swift', 'RxSwift']
series      = ['RxSwift Operators']
toc         = 'true'
pinned      = 'false'
description = '''
RxSwift provides a group of operators to spawn sequence of various shapes. Most
of operators here have distinct use cases of their own.
'''
+++

# Create Sequences Programmatically

Although the RxSwift framework, combined with RxCocoa, provides a bunch of
common and qualified predefined observables, the 2 operators in the this
section provides the most fundamental yet flexible way to get a observable.

## +create

You bury into the parameter block the sequence emitting blueprint as well as
necessary sequence tear-down details, then on subscription the sequence gets
spawned as whatever you designed.

```swift
let seq = Observable<Int>.create { observer in
  ...
  observer.on(.next(1))
  ...
  observer.onNext(2)
  ...
  observer.onError(Error.someError)
  // Or
  observer.onCompleted()

  // Do nothing in cleanup
  return Disposables.create()
  // Or do something in cleanup
  return Disposables.create { ... }
}
```

## +deferred

Before a sequence created by `Observable<T>.create` starts emitting elements,
there are 2 relevant stages for it:

1. __Creation Time__ is when the `.create` operator is invoked.

1. __Subscription Time__ is when the `.subscribe` method is invoked.

The block parameter of `.create` operator stores a time sequence chart of the
sequence's event emitting. But it is fixed at the time of creation through this
operator.

`.deferred` delay sequence shape determination from creation time to
subscription time. The block passed to it simply return a `Observable`, so you
can delay your determination of what the sequence should be till the last
moment before element emitting.

```swift
let seq = Observable<Int>.deferred { () -> Observable<Int> in
  switch someRuntimeEnvironment {
  case .foo:
    return makeObservableA()
  case .hoo:
    return makeObservableB()
  default:
    throw someError
  }
}
```

# The 3 Special Convenient Operators

## +error

`Observable<T>.error(someError)` it creates a sequence emitting no element, on
subscription it emits the given error object then terminates.

It is commonly used in those operator block parameters which returns a new
observable as its result. By `return .error(someError)`, the outer sequence
usually gets terminated by the error object.

## +empty

`Observable<T>.empty()` it creates a sequence emitting no element, it completes
(by emitting `.completed` event) immediately on subscription.

Terminate a sequence silently (without by emitting an error) making the source
sequence never errors out, just complete silently which is useful in merging
scenarios.

```swift
seq.catchError { _ in return .empty() }
```

Combine with `flatMap` to __filter out__ some element from source sequence.
```swift
seq.flatMap { value in
  if needToFilter(value) {
    return .empty()
  } else {
    return .just(value)
  }
}
```

It achieves the same effect as the `filter` operator, but the later is
optimized.

## +never

`Observable<T>.never()` it creates a sequence that emits nothing, and never
complete by itself. Hence the only way to terminate the sequence is by
explicitly calling `dispose()` method of the `Disposable` instance returned
from its subscription.

# Create From Listed Elements

## +just

Create a sequence containing only one element (the parameter) which is emitted
immediately on subscription.

Used to start a chain of steps

```swift
let imageURL = URL(string: "...")
Observable<URL>
  .just(imageURL)
  .flatMap { url -> Observable<UIImage> in
    // Download
    return downloadImage(url)
  }
  .flatMap { image -> Observable<UIImage> in
    // Process image
    return processImage(image)
  }
  ...
```

## +once

This operator is provides by [RxSwiftExt] community project. It is similar to
the `.just` operator but the promise that only the first subscriber can receive
the only element, further subscribers get an empty sequence.

The created sequence acts like a shared sequence with only one element and does
not replay element.

## +from, +of

Create an observable sequence from a array of elements.

Combine with merging operators to fire multiple sequence.

```swift
Observable<T>
  .from([url_1, url_2, ..., url_n])
  .flatMap { url -> Observable<Data> in
    return request(url)
  }
```

A concurrency optimized version using `map` + `merge(maxConcurrency)`
combination:

```swift
Observable<T>
  .from([url_1, url_2, ..., url_n])
  .map { url -> Observable<Data> in
    return request(url)
  }
  .merge(macConcurrency: 4)
```

The __of__ operator is the variatic version of `.from` operator for convenience.

## +from(optional:)

It accepts an optional value. If the value is not nil, the sequence acts like
`.just` of the wrapped value, otherwise it is equivalent to `.empty()`. The
created sequence can be seen as a weakly typed `Maybe` traits.

It also has a second (optional) parameter specifying the scheduler to emits the
only value.

# Turn Swift Sequences Into Observable Sequences

## +range

It is equivalent to `Observable<T>.from([T](start..<(start + count)))`

## +repeatElement

## +generate

# One More Way - Use Subjects To Create Observables

A common way to bridge the traditional Cocoa Touch into reactive world is to
use a subject to convert the prevalent delegate callbacks into observables.

{{< highlight swift "hl_lines=3 6 12 16" >}}
class LocationService: NSObject, CLLocationManagerDelegate {

  let visitSubject = BehaviorSubject(value: .init())

  var visits: Observable<CLVisit> {
    return locationSubject.asObservable()
  }

  // MARK: CLLocationManagerDelegate

  func locationManager(_ manager: CLLocationManager, didFailWithError error: Error) {
    visitSubject.onError(error)
  }

  func locationManager(_ manager: CLLocationManager, didVisit visit: CLVisit) {
    visitSubject.onNext(visit)
  }
}
{{< / highlight >}}

After the exposed observable gets subscribed, the backing subject instance is
__retained__ by the sink chain created in memory.
