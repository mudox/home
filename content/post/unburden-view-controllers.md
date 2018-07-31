+++
title       = "Unburden View Controller"
date        = 2018-07-29T04:57:59+08:00
draft       = true
tags        = ['View Controller', 'iOS', 'App Architecture']
toc         = 'true'
pinned      = 'true'
description = '''
In iOS app development, view controllers often take too much responsibilities
which results in big view controller source file compared to other components
(model layer, view layer). Separating them into clear and controllable components
is a good start for a qualified app architecture.
'''
+++

# The Evolution Story

I guess at the very beginning of GUI app architecture evolution, there might be
only 2 layers:

- **View layer** for displaying data model states, views just fetching data
  from model layer, perform some simple but necessary formatting and then show
  them out.

- **Model layer** for store and manipulating data

As the program evolves, a new layer **View Controller** was brought up to relief of
views before their source files become too huge.

However the desire of human has no rest, as a result the app's work flows grew
rapidly. The view controller layer soon stepped into the same trap as view
layer has.

Since birth of the classic MVC app architecture, a bunch of new app
architectures has emerged in hope of curing the obesity of view controller
layer. They look stylish or wired ..., behaves modernly or oddly .... However in
essence, they may all started from the same pain - fat view controllers,
with the same purpose - unburden view controllers.

# The Principles

Although I can end almost all these kind of talks about app architecture by
putting up the almighty [SOLID] principle which, in my opinion, are rather
abstract and vague for beginners. I would like to provide some more catchy
principles for newcomers into the app architecture realm.

## Simple types

This includes 2 points:

1. __Types not inherited from those complicated classes__

    In object-oritent programming, subclassing is the dominant code reusing
    method. Whenever I wanted to add some code, the fist step come into my head
    is _subclassing something_ ...

    In iOS developing, we often subclass UIKIt provided classes like `UIView`,
    `UIViewController`. These class are already overstuffed by Apple, both
    `UIView` and `UIViewController` has 40+ various kind of memebers, not even
    mention what them inherit from superclasses `UIResponder`, `NSObject`.

    Your subclasses of those framework provided classes is already too
    complicated to test, maintain ... Every single line changing to the
    subclass just makes you wondering how would the superclass affect my code.

1. __Types that manage less states__

    The more states attached to type, the more complex and harder to maintain
    it would become. The reason behind is the [combinatorial explosion]
    problem.



## Less code

Evey single line of code logic, especially those crafted manually on you own,
may introduces bugs, and even worse, the interaction between code lines would
introduces extra bugs. Sounds scaring? It is the life.

Hence for a given component, implement by reusing as much as possible. Discover
and invoke a battle-tested library or framework heavily reduce your codebase
footprint as well as increase your production quality. It is so important
that I even think that 80% of an professional coder's working time should be
investigated into it.

## One way data flow

Let take a very common code snippet for example:

{{< highlight swift "linenos=inline,hl_lines=5 9" >}}
func table(_ table: UITableView, didSelectRowAt rowIndex: Int) {
    let object = self.dataSource[indexPath]

    // model layer  <--  [data]         view layer
    object.selected = !object.selected

    // model layer       [data]   -->   view layer
    if let cell = tableView.cellForRow(at: indexPath) {
        cell.accessoryType = (object.selected) ? .checkmark : .none
    }
}
{{< /highlight >}}

This kind of codes frequently appears from beginner's tutorials and their
projects. The method changes the data modal (line #5) as well as updates the
view display (line #9) which means the data within a single method flow to both
the data model and view layer.

As the model strcuture and UI interaction logic grows, there would be more and
more of this sort of two-way data flow codes scattered around your source file.
You are almost destined to be beaten by your code at some point in future.
Even a simple reactor of the model or UI comes with great pains like finding
where is the changed part be used in the code, and you end up wondering where
am I? how could I write these kind of shit?

# Diagnosis & Treatment

Here list out responsibilities a massive view controller might have taken and
some principals or solutions that can resolve them.

## Interact with data

- Observe for data model changes

    Observe changes from other components using technologies like KVO,
    NotificationCenter, Core Data observation interface, Realm observation
    interface etc.

- Fetch or pre-fetch data from local sandbox or remote servers

    E.g. Use the UIKit URL loading system to send a URL request, and implement
    `URLTaskDelegate` in the view controller source file. Load data from Core
    Data, Realm, SQLite ...  directly in the view controller source file.

- Transform data for displaying.

    E.g. use `DateFormatter` to format  data objects into string for display on views.

- Update data

    This includes the most common inserting, deleting, updating operations as
    well as data persistence, caching etc. That adds up a hell log of code.

### Solution

Introduce __MVVM__ pattern.

The key point of MVVM is the new role - __view model__ added between the view
controller and the data model. In MVVM, it is view models instead of view
controllers who directly interact with the data model.

The FRP (Functional Reactive Programming) technology greatly enhances MVVM
pattern by providing reactive bindings between view model and view, and between
view model and data model. The Swift FRP implementation I use for nowadays -
[RxSwift] provides clear and consistent interface for both listening events from
view and observing changes from data model. FRP is a skill that deserves you to
investigate your time.

For data transforming, we can define specific type (often named `...Formatter`)
for them if the task is non-trivial.

During the app lifetime, app might access various kind data from various sources, like:

- Data from remote service  
  Define one or more `...NetworkService` for URL requesting.

- Data from local persistence storage (e.g. Core Data, Realm database)  
  Define one or more `....DataService` for local data manipulation.

- User related data  
  Define `UserSerivce` to manage user authentication and user info storage.
  Define `UserPreferencesSerivce` to manage user preference.

## Manage views

- Manipulate subview hierarchy

    When loading, view controler need to make its initial subview tree. (e.g.
    in `loadView` ot `viewDidLoad` method).

    During its lifetime, view controller might need to manipulate its subview
    hierarchy on demand. Including

      * Adding / removing / moving subviews in the hierarchy.
      * Animating views on demond.

- Manage view's display

    When backing data comes / changes, view controller format and show them on
    views. E.g. tranform a `Date` object into string using `DataFormatter`,
    and then assign it ot `aLabel.text` to display the date.

- Communicate with subviews

    There are a lot of `UITableViewData`, `UITableViewDelegate` code section
    scattered in view controller source files which add up a significant number
    of code lines into the source files.

### Solution

The first 2 responsibilities are definitely view controller's duty. For
communicating with subviews, we can introducing specifically defined type(s) to
take over it. E.g. view models in MVVM pattern, or a custom delegate or data
source class.

For example, the [RxSwift Community] provides project [RxDataSources] which
defines reactive data source types for views such as `UITableView`,
`UIcollection`... All we need to do is creating and correctly configuring them
at the beginning (often in `viewDidLoad` method), and then bind them to the
views. And everything works.

## Manage scene navigation

- Spawn other view controllers

    Before scene transition the source view controller needs to load or create
    other view controllers to transition to. This adds a coupling that the view
    controller need to know the app context (e.g. storyboard, xib files to load
    view controller from, or other view controller class instantiate them
    programmaticall.)

- Manage scene transition.

    Beside creating / load view controller, view controller also need to fire
    a transition to the new controller. UIKit only provides 2 ways to put new
    view controller onto stage:

    1. Modally present the view controller  
       By modal presentation view controllers form a relationship between
       presenting view controller and presented view controller.

    1. Embed the view controller into containing view controller  
       UIKit provides 2 prevalent container view controller:
       `UINavigationController` and `UITabBarController`, as well as allowing
       deveoloper to design their own custom container view controller. See
       [View Controller Containment] for a good introducation.


- Communicate with other view controllers

    1. Communicate with upstream in the flow  
       Sometimes, a view controller would need to change its parent view
       controller. E.g. change naviation controller's navigation bar.

    1. Communicate with downstream in the flow  
       After transition to view controller down the work flow, the source view
       controler often need to be notified of the result from the presented view
       controller.

### Solution

Introduce the __Coordinator__ pattern.

Define a `AppCooridnator` which

1. Decides and present the fist interface after app launch.  
   E.g. if it is the first launch of the app or the current version, the app
   coordinator create and show guides interface. If the user is not signed in,
   app coordinator shows up authentication interface instead of home interface.

2. Manages app's home work flow which contains the first interface(s) it created.

2. Responds to scene transition requests from view controller(s) in its flow to

   - Transition to next scene in its flow
   - Transition to other work flows (managed under other coordinators)  
     In this case, the app coordinators creates new coordinators which manages other work
     flow of the app.

Each coordinators manges a planned work flow of the app which is a series of
view controllers (scenes) shown in line to user to complete certain works.

Swift community has provided some coordinators implementations:

- [URLNavigator]
- [RxFlow]
- [RxCoordinator]

Or you can implement them manually, they are simple role in the architecture,
no need make them complicated in my opinion.

## One view controller manages the whole interface

A non-trivial app often features a very rich home interface.

As a result, the view controller should create a whole lot of subviews, manage
every aspect of them.

### Solution

Use view controller containment technology.

Divide the view controller's whole interface into reasonable regions, and hand
them over to several child view controllers. Since iOS 5, UIKit provides view
controller containment API for developers to handle this need.

See [View Controller Containment] for a good introduction.


## Other stuffs that should not fall into view controller

- Playing media files

- Perform LBS tasks

- Manage user notification

These features should all tuck into specific classes named like `...Manager` or `...Servcie`.

# References

- [Coordinator Redux]
- [8 Patterns to Help You Destroy Massive View Controller]
- [View Controller Containment]

[Coordinator Redux]: http://khanlou.com/2015/10/coordinators-redux/
[8 Patterns to Help You Destroy Massive View Controller]: http://khanlou.com/2014/09/8-patterns-to-help-you-destroy-massive-view-controller/
[View Controller Containment]: https://www.objc.io/issues/1-view-controllers/containment-view-controller/
[RxSwift]: https://github.com/ReactiveX/RxSwift
[RxSwift Community]: https://github.com/RxSwiftCommunity
[RxDataSources]: https://github.com/RxSwiftCommunity/RxDataSources
[URLNavigator]: https://github.com/devxoul/URLNavigator
[RxFlow]: https://github.com/RxSwiftCommunity/RxFlow
[RxCoordinator]: https://github.com/quickbirdstudios/RxCoordinator
[SOLID]: https://en.wikipedia.org/wiki/SOLID
[combinatorial explosion]: https://en.wikipedia.org/wiki/Combinatorial_explosion
