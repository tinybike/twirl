Twirl
=====

[![Build Status](https://travis-ci.org/tinybike/twirl.svg)](https://travis-ci.org/tinybike/twirl)
[![Coverage Status](https://coveralls.io/repos/tinybike/twirl/badge.svg?branch=master&service=github)](https://coveralls.io/github/tinybike/twirl?branch=master)
[![npm version](https://badge.fury.io/js/twirl.svg)](https://badge.fury.io/js/twirl)

A few vanilla JS methods to move/rotate/scale points in 2-D and 3-D.

Usage
-----
```
$ npm install twirl
```
To use Twirl in Node.js, simply require it:
```javascript
var twirl = require("twirl");
```
A minified, browserified file `dist/twirl.min.js` is included for use in the browser.  Including this file attaches a `twirl` object to `window`:
```html
<script src="dist/twirl.min.js" type="text/javascript"></script>
```

To use `twirl.twirl`, specify the rotation angle, the rotation center (the point around which your points will be rotated; if `null` the rotation will be around the origin), scaling factor (amount to zoom in/out), and a list of points as an array-of-arrays:
```javascript
var angle = 30; // 30 degree rotation (counter-clockwise in a right-handed coordinate system)
var rotationCenter = [8, 10]; // rotate around the point (8, 10)
var scalingFactor = 1.1; // zoom in 1.1x
var coords = [[4, 2], [1, 2], [0, 0]]; // three (x, y) coordinate pairs
var newCoords = twirl.twirl(angle, rotationCenter, scalingFactor, coords);
// newCoords: [8.58948822334847, 0.17897644669693946],
//            [5.731604390859821, -1.471023553303061],
//            [5.878976446696939, -3.926279441628827]
```

Tests
-----

Unit tests are included in `test/`, and can be run using npm:
```
$ npm test
```
