- having a fat client and a server-side rendered html
- compiling to javascript, usability of frameworks
    - go https://github.com/gopherjs/gopherjs
    - haskell
    - clojure
    - scala
- errors
    - callbacks
    - https://medium.com/@jico/the-fine-art-of-javascript-error-tracking-bc031f24c659
    - https://jakut.is/2014/08/21/async-stack-traces/
- testing
    - test rest apis with nodejs, hapijs
    - http://www.smashingmagazine.com/2014/10/07/introduction-to-unit-testing-in-angularjs/
    - http://tech.blog.box.com/2014/10/introducing-leche-a-javascript-testing-utility-for-mocha-and-sinon/
- es6
    - http://colintoh.com/blog/lightweight-es6-features
    - http://www.infoworld.com/article/2837425/javascript/ecmascript-6-returns-javascript-to-original-intent.html
    - shims
    - using ecmascript6 today http://es6rocks.com/2014/10/es6-modules-today-with-6to5/ https://github.com/6to5/6to5
    - google clojure in-language out-language
    - traceur
    - facebook flow
    - http://esnext.github.io/esnext/
    - http://updates.html5rocks.com/2014/10/Generators-the-Gnarly-Bits?utm_source=javascriptweekly&utm_medium=email
- what framework?
    - making angular with microlibs
        - https://github.com/mcordingley/Inverse.js
        - httpinvoke
        - react
        - ..other angular modules?
    - no angular
        - http://www.sitepoint.com/anatomy-javascript-mv-framework/
        - http://readwrite.com/2014/10/30/angularjs-javascript-framework-web-tools-need-to-break-themselves https://medium.com/este-js-framework/whats-wrong-with-angular-js-97b0a787f903
        - http://www.airpair.com/angularjs/posts/top-10-mistakes-angularjs-developers-make
    - https://dev.opera.com/articles/perfect-javascript-framework/
- reactive
    - libs: rxjs, baconjs, transducers http://blog.cognitect.com/blog/2014/8/6/transducers-are-coming http://jlongster.com/Transducers.js-Round-2-with-Benchmarks https://github.com/nullobject/fkit
    - wiring client side codebase with CommonJS and NodeJS Streams, react+streams CONEXFOAM https://github.com/omniscientjs/omniscient https://github.com/moreartyjs/moreartyjs
    - intro to ReactJS, webstorm support for react http://thinkingonthinking.com/the-rendering-question/ http://blog.andrewray.me/reactjs-for-stupid-people https://github.com/BinaryMuse/react-primer
    - reactive architectures: why? how? what?
        - http://futurice.com/blog/reactive-mvc-and-the-virtual-dom
        - http://modernweb.com/2014/10/15/javascript-architecture-23rd-century/
        - http://staltz.com/mvi-freaklies/
        - http://www.slideshare.net/rolandkuhn/akka-and-angular-js-persistent-gabbler
        - https://speakerdeck.com/mgonto/reactive-angular
        - !!!! http://victorsavkin.com/post/99998937651/building-angular-apps-using-flux-architecture
    - self-updating reactive angular - listening for server events
    - http://rauchg.com/2014/7-principles-of-rich-web-applications
    - separating react templates https://github.com/redexp/react-separate-template
    - flux implementations http://scotch.io/tutorials/javascript/getting-to-know-flux-the-react-js-architecture http://kenwheeler.github.io/mcfly/
    - angular+react (motivation: using angular, but found a nice react component) https://github.com/davidchang/ngReact https://github.com/facebook/react/wiki/Complementary-Tools http://jquense.github.io/react-widgets/docs/ http://react-components.com/ https://github.com/enaqx/awesome-react
        - http://victorsavkin.com/post/99998937651/building-angular-apps-using-flux-architecture
- angular2
    - https://docs.google.com/a/wix.com/document/d/11YUzC-1d0V1-Q3V0fQ7KSit97HnZoKVygDxpWzEYW0U/mobilebasic?pli=1&viewopt=127 AtScript Primer: Angular's Idea for an Enhanced JavaScript
        MISKO HEVERY AND ROB EISENBERG
        Presented as part of Angular’s design docs, AtScript is a TypeScript-esque idea for an enhanced version of JavaScript with type introspection and type, field, and metadata annotations. Angular 2.0 will be built on AtScript.
    - https://docs.google.com/a/wix.com/presentation/d/1XQP0_NTzCUcFweauLlkZpbbhNVYbYy156oD--KLmXsk/preview?sle=true&slide=id.p
    - http://eisenbergeffect.bluespire.com/all-about-angular-2-0/
    - https://plus.google.com/u/0/+IgorMinar/posts/2Uo6yh4AV7L
    - https://docs.google.com/a/wix.com/document/d/1dZdq2L8EkzimgvU93ypLF9GJpdzD2jjm08Zal6sfxMQ/edit?hl=en&forcehl=1
- modules
    - built systems, generators, boilerplates http://www.airpair.com/js/using-angularjs-yeoman wix-angular-generator http://vesparny.github.io/angular-kickstart/
    - Intro to Gulp
    - creating a javascript library
    - https://github.com/jakutis/httpinvoke - reasons, methods and results
    - frontend development with npm packages https://github.com/yiminghe/learning-react/blob/master/tutorial/env/modulex-browserify-npm.md
    - module systems http://blog.npmjs.org/post/101775448305/npm-and-front-end-packaging
        Simple Modules      https://github.com/togakangaroo/simple-modules
        SystemJS            https://github.com/systemjs/systemjs
        jspm                https://github.com/jspm/jspm-cli
        ymodules            https://github.com/ymaps/modules/
        duo                 http://duojs.org/
        webpack             https://github.com/webpack/webpack
        browserify          https://github.com/substack/node-browserify
        wd.js               https://github.com/tjwudi/wd.js
- webapp security - basic attacks and their prevention
- Web Components
  - http://www.w3.org/wiki/WebComponents/
  - https://www.polymer-project.org/articles/spa.html
  - integrating with angular http://pascalprecht.github.io/2014/10/25/integrating-web-components-with-angularjs/
- javascript replacing native apps
  - http://www.sitepoint.com/javascript-beyond-web-2014
  - crypto apis https://timtaubert.de/blog/2014/10/keeping-secrets-with-javascript/
  - device apis
  - app generators (e.g. phonegap)
  - https://hacks.mozilla.org/2014/10/introducing-simd-js/
