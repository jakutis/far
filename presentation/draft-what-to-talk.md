- [bespoke.js](http://markdalgleish.com/projects/bespoke.js/)
- [anatomy of a javascript MV\* framework](http://www.sitepoint.com/anatomy-javascript-mv-framework/)
- reactive angular
  - [Reactive Angular](https://mgonto.github.io/reactive-frontend-talk/)
  - [Reactive Extensions Bindings for AngularJS](https://github.com/Reactive-Extensions/rx.angular.js/)
  - [How do I integrate Angular.js with RxJS?](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/howdoi/angular.md)
- 7 principles of rich web applications
  - Server rendered pages are not optional
  - Act immediately on user input
  - React to data changes
  - Control the data exchange with the server
  - Don’t break history, enhance it
  - Push code updates
  - Predict behavior
- content
  - chat + slides viewer
  - similar
    - https://github.com/enaqx/awesome-react#react-and-angular
    - https://speakerdeck.com/fisherwebdev/flux-meetup
  - angular criticisms
    - https://storify.com/marcslove/tom-dale-angular-rant
    - [Why Web Tools Like AngularJS Need To Keep Breaking Themselves](http://readwrite.com/2014/10/30/angularjs-javascript-framework-web-tools-need-to-break-themselves)
    - [What I would recommend instead of Angular](https://medium.com/este-js-framework/what-i-would-recommend-instead-of-angular-js-62b057d8a9e)
      - view: React
      - routing: anything
      - modules: commonjs
      - model: vanilla js, backbone or https://github.com/facebook/react/wiki/Complementary-Tools
      - controller: flux
      - utilities: npm and bower
      - building: gulp
    - [You have ruined HTML](http://blog.dantup.com/2014/08/you-have-ruined-html/)
      - programming in html
    - [AngularJS: The Bad Parts](http://larseidnes.com/2014/11/05/angularjs-the-bad-parts/)
      - dynamic scoping
      - parameter name based dependency injection
      - digest loop
      - redefining well-established terminology
      - unnecessary complexity
    - https://medium.com/este-js-framework/whats-wrong-with-angular-js-97b0a787f903 - mostly about angular views
      - app logic in html
      - two way data binding - antipattern
      - dirty checking is slow
      - #4 is not true
      - not flux and html parsing
      - no server side rendering
      - #7 is not true
      - #8 is not true
      - #9 is not true
      - #10 is not true
    - addressing weaknesses
      - flux and react https://developers.mobileapptracking.com/addressing-angular-weaknesses-with-react-and-flux/
  - anything else
    - [Virtual DOM](https://github.com/Matt-Esch/virtual-dom) [Virtual DOM benchmarks](http://elm-lang.org/blog/Blazing-Fast-Html.elm)
    - [Mercury](https://github.com/Raynos/mercury)
    - [MVI](http://futurice.com/blog/reactive-mvc-and-the-virtual-dom)
  - react tools
    - [awesome-react](https://github.com/enaqx/awesome-react)
    - https://github.com/mindreframer/reactjs-stuff
    - https://github.com/enaqx/awesome-react#components
    - [React Components](http://react-components.com)
    - [React Widgets](http://jquense.github.io/react-widgets/docs/)
    - [React Bootstrap](http://react-bootstrap.github.io/)
  - server side rendering
    - motivation:
      - seo
      - legacy browser support
      - user perceived performance
      - #1 principle http://rauchg.com/2014/7-principles-of-rich-web-applications/
        - If we want to optimize for the best possible user experience and performance, giving up one or the other is never a good idea.
    - http://vimeo.com/108488724
    - https://speakerdeck.com/mridgway/isomorphic-flux
    - https://github.com/enaqx/awesome-react#server-side-rendering
    - isomorphic web apps http://nerds.airbnb.com/isomorphic-javascript-future-web-apps/
    - https://github.com/enaqx/awesome-react#writing-isomorphic-apps
    - https://github.com/yahoo/mojito
  - views
    - do not use angular views at all
      - server side rendering?
    - use ngreact with angular views
  - flux implementations
    - https://github.com/enaqx/awesome-react#flux
    - http://victorsavkin.com/post/99998937651/building-angular-apps-using-flux-architecture
    - http://kenwheeler.github.io/mcfly/
  - flux intros
    - https://github.com/enaqx/awesome-react#flux-tutorials
    - http://scotch.io/tutorials/javascript/getting-to-know-flux-the-react-js-architecture
    - https://skillsmatter.com/skillscasts/5429-going-big-with-react
    - [Bill Fisher, Facebook: React and Flux: Building Applications with a Unidirectional Data Flow](https://www.youtube.com/watch?v=i__969noyAM)
    - [Max Power](https://www.youtube.com/watch?v=N-btzvTo4Zs)
    - [Intro to React](https://jakut.is/files/intro-to-react/)
  - performance
    - [Faster AngularJS Rendering](http://www.williambrownstreet.net/blog/2014/04/faster-angularjs-rendering-angularjs-and-reactjs/)
      - You don't have to wait for Angular 2.0, the author of the article just didn't know the "track by" feature of ng-repeat can be used to optimize performance of rendering big arrays (and to be fair, the docs don't mention the trick explicitly). -- https://news.ycombinator.com/item?id=7620998
        - the author acknowledge this:
            AngularJs + ReactJs: (http://plnkr.co/edit/6zfFXU?p=preview) Initial loading: ~ 243ms, Updating: ~ 125ms
            AngularJS using Track By (http://plnkr.co/edit/5FCsQO?p=preview) Initial loading: ~ 990ms, Updating: ~130ms
            AngularJs ngRepeat (http://plnkr.co/edit/YnF7Vn?p=preview) Initial loading: ~ 1100ms, Updating: 1150ms
    - [Improving AngularJS long list rendering performance using ReactJS](http://www.mono-software.com/blog/post/Mono/242/Improving-AngularJS-long-list-rendering-performance-using-ReactJS/)




# Content

## Comment component in Angular

    <div ng-controller="commentsController">
        <div>
            <comment-list comments="comments" />
        </div>
        <textarea ng-model="newComment"></textarea>
        <button ng-click="addNew(newComment)">Add</button>
    </div>

## Comment component in React

    <comments ng-controller="commentsController" comments="comments" add-new="addNew" />
