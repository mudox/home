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

## Observable.create

This is the most fundamental yet flexible way to create a sequence.

You bury into the parameter block the sequence emitting blueprint as well as
necessary sequence tear-down details, then on subscription the sequence gets
spawned as whatever you designed.

```swift

```

## Observable.deferred

# The 3 Special Convenient Operators

## Observable.error

## Observable.empty

## Observable.never

# Create From Listed Elements

## Observable.just

## Observable.from

## Observable.of

# Turn Swift Sequences Into Observable Sequences

## Observable.range

It is equivalent to `Observable<T>.from([T](start..<(start + count)))`

## Observable.repeatElement

## Observable.generate

# One Way More - Use Subjects To Create Observable
