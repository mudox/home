+++
title       = "RxSwift Operators - Error Handling"
date        = 2018-08-10T00:42:04+08:00
draft       = true
tags        = ['Swift', 'RxSwift']
series      = ['RxSwift Operators']
toc         = 'true'
pinned      = 'false'
description = '''
RxSwift provides 3 ways to let a sequence errors out at any time point of its
lifetime as well as 2 strategies to handle these emitted errors.
'''
+++

# How To Error Out in RxSwift

Generally there are 3 ways to terminate current sequence with an error.

1. Create a special observable that emits nothing but an error
   `Observable.error(someError)`.

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

2. Emit an error event to the observer parameter in an `Observable<T>.create`
   block parameter `observer.onError(someError)`.

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

Actually the retry way is just a specialized version of the catch way - it catch
errors and then switch to same sequence again.

# Strategy #1 - Catch Errors

There are 4 error catching operators I known:

1. __On error switch to another sequence__ `seq.catchError { error -> Observable<T> in .... }`

    The block, on error, would return a new observable sequence to switch to.

1. __On error end with a given value__ `seq.catchErrorJustReturn(someValue)`

    It is equivalent to `seq.catchError { _ in return .just(someValue) }`

1. __On error just complete silently__ `seq.catchErrorJustComplete()`

    It is equivalent to `seq.catchError { _ in return .empty() }`, this
    operator is provided by the [RxSwiftExt] community project.

1. __On error switch to next observable__ `Observable<T>.catchError(swiftSequenceOfObservables)`

The traits `Driver` and `Signal` from RxCocoa also provides similar operators
when converting from ordinary sequences:

- `seq.asDriver(onErrorJustReturn: someValue)`
- `seq.asDriver(onErrorDriveWith: alternativeDriver)`
- `seq.asDriver(onErrorRecover: { error -> Driver<T> in ... })`
- `seq.asSignal(onErrorJustReturn: someValue)`
- `seq.asSignal(onErrorSignalWith: alternativeSignal)`
- `seq.asSignal(onErrorRecover: { error -> Signal<T> in ... })`

Sequence error catching is really useful for those `flatMap` scenarios, where
the outer sequence would terminate if any of its inner sequence errors out
(inner errors would be propagated out and terminate outer sequence).

{{< highlight swift "hl_lines=9 11 13 15" >}}
seq
  .flatMap { value -> Observable<T> in
    return makeInnerSequence()
      .catchError { error in
        jack.error("inner error: \(error)")
        return alternativeSequence
      }
      // or
      .catchErrorJustReturn(someValue)
      // or
      .catchErrorJustComplete()
      // or
      .asDriver(onError...)
  }
  .asDriver(onError...)
{{< / highlight >}}




# Strategy #2 - Retry

RxSwift provides 3 retry operators:

1. __Retry unlimited__ `seq.retry()` retry unconditionally, use it with caution.

2. __Retry limited times__ `seq.retry(count)` retry at most `count` times then
   errors out.

3. __Retry conditionally__ `seq.retryWhen { errorObservable -> TriggerObservable in ... }`

    This is the most powerful retry policy. For each stripe of errors & retries,
    the operator create a new error observable which emits current stripe of
    consecutive errors and pass it into the block paramter. The block paramter,
    according to the error sequence, return an appropriate triggering
    observable, the operator wait only the first element from the trigger
    observable then retry the source sequence.

    __Usage #1__ - Retry after incremental backoff delay

    ```swift
    seq.retryWhen { errorObservable -> Observable<T> in
      return errorObservable
        .enumerated()
        .flatMap({ index, error in
          if index < 3 {
            let delay = pow(2, (index + 1))
            return Observable<T>.timer(delay, scheduler: MainScheduler.instance)
          } else {
            throw error
          }
        })
    }
    ```

    __Usage #2__ - Retry after pre-condition met, like waiting till the network gets
    re-connected, authentication passed, permission granted.

    ```swift
    seq.retryWhen { errorObservable -> Observable<T> in
      return errorObservable
        .flatMap({ error in
          switch error {
          case .network:
            return ReachabilityService.reachByWiFi()
          case .unauthorized:
            return AuthenticationService.authenticate()
          case ...
            ...
          }
        })
    }
    ```

__Notes__:

If the observable is not `Single` like (i.e. emits more than one `.next`
events), retry would cause duplicated events emitted again and again.
Especially when work with `startWith` or `concat` operator, apply them after
the `retry` would usually be a better idea.

[RxSwiftExt]: https://github.com/RxSwiftCommunity/RxSwiftExt
