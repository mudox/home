+++
title       = "RxSwift Operators - Error Handling"
date        = 2018-08-10T00:42:04+08:00
draft       = true
tags        = ['Swift', 'RxSwift']
series      = ['RxSwift Operators']
toc         = 'true'
pinned      = 'false'
description = '''
The RxSwift operators are too hard for beginners to understand.  The better learning
way is to put operators into their real-life use scenarios.
'''
+++

# How To Error Out in RxSwift

Generally there are 3 ways to emit out errors:

1. Create a special observable that emits nothing but an error

    {{< highlight swift "hl_lines=10" >}}
class LocationService {
  enum Error: Swift.Error {
    ...
    case serviceDisabled
    ...
  }

  func startLocationUpdating() -> Observable<Location> {
    guard CLLocationManager.locationServiceEnabled else {
      return .error(Error.serviceDisabled)
    }
    ...
  }
}
{{< / highlight >}}

2. Emit an error event to observer in an observable creating block.

    {{< highlight swift "hl_lines=4" >}}
Observable<T>.create { observer in
  ...
  let someError = ...
  observer.onError(someError)
  ...
  return Disposables...
}
{{< / highlight >}}

3. Throw an error in those operator block parameters that are defined as
   `throws`, the sequence would terminates on the error event.

    {{< highlight swift "hl_lines=4" >}}
someSequence.map { value in
  guard ... else {
    let someError = ...
    throw someError
  }
  ...
}
{{< / highlight >}}

# Error Handling Policies

RxSwift provides 2 handling policies:

1. Catch error and switch to another sequence

2. Retry the original sequence

Actually the retry way is just a specialized version of the catch way, it catch
errors and then switch to same sequence again.

# Catch Errors

RxSwift provides 3 build-in operators:

1. `seq.catchError { error -> Observable<T> in .... }`

1. `seq.catchErrorJustReturn()`

1. `Observable<T>.catchError(swiftSequenceOfObservables)`

# Retry

1. Retry unlimited

2. Retry limited times

3. Retry conditionally
