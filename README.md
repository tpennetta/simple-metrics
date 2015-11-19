Simple Metrics
==============

Introduction
------------
Simple Metrics was built as a NodeJS module which enables the end user to track and manage metrics of a collection of measurements of performance over time. The module natively supports displaying time and delta time information in the format of microseconds.

Installation
------------
`npm install --save simple-metrics`

Usage
-----
```
var myMetrics = require('simple-metrics');

//start() inits a new metric measurement and returns a
//guid to refer to this particular metric measurement.
var guid = myMetrics.start();

//... Do work to be performance tested ...

//stop() records the endTime and elapsedTime
//of a particular metric measurement and returns the
//elapsed time
var elapsed = myMetrics.stop(guid);

//getAllMetrics() returns an object literal collection of
//metric measurement objects.
console.log(myMetrics.getAllMetrics());
myMetrics.clear();

```
