Twirl
=====

[![Build Status](https://travis-ci.org/tinybike/twirl.svg)](https://travis-ci.org/tinybike/twirl)
[![Coverage Status](https://coveralls.io/repos/tinybike/twirl/badge.svg?branch=master&service=github)](https://coveralls.io/github/tinybike/twirl?branch=master)
[![npm version](https://badge.fury.io/js/twirl.svg)](https://badge.fury.io/js/twirl)

Tools for zooming and rotating around arbitrary points in 2-D and 3-D.  Twirl uses Tait-Bryan angles (i.e., roll, pitch, and yaw) for 3-D rotations.

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

### 2-D Rotate/Zoom

Twirl has a combined 2-D rotate/zoom method called `rotateZoom`.  To use this function, you will need to specify:
    - the rotation angle (degrees counter-clockwise in a right-handed coordinate system)
    - the rotation center (the point around which your points will be rotated; if `null` the rotation will be around the origin)
    - zoom factor (amount to zoom in/out)
    - list of coordinates you want to rotate/zoom (as an array-of-arrays)
```javascript
var angle = 90;      // 90 degree rotation
var center = [1, 1]; // rotate around the point (1, 1)
var zoom = 2;        // 2x zoom
var coords = [[3, 1], [1, 1], [0, 2]]; // (x, y) coordinates
twirl.rotateZoom(angle, center, zoom, coords);
// output: [[1, 5], [1, 1], [-1, -1]]
```
Twirl also has individual `rotate`, `zoom`, and `translate` methods.  Please refer to the unit tests for details/usage.

### 3-D Rotate/Zoom

Twirl's combined 3-D rotate/zoom method is called `rotateZoom3D`.  This function requires the same inputs as `rotateZoom`, except that it takes three input angles (roll, pitch, and yaw) instead of just one.  3-D rotations are defined by specifying their elemental rotations; `rotateZoom3D` follows the z-y'-x'' (yaw-pitch-roll) intrinsic rotation convention.
```javascript
var roll = 90;          // 90 degree rotation around the x-axis
var pitch = 90;         // 90 degree rotation around the y-axis
var yaw = 90;           // 90 degree rotation around the z-axis
var center = [1, 1, 1]; // rotate around the point (1, 1, 1)
var zoom = 2;           // 2x zoom
var coords = [[1, 1, 1], [2, 3, 4]]; // (x, y, z) coordinates
twirl.rotateZoom3D(roll, pitch, yaw, center, zoom, coords);
// output: [[1, 1, 1], [7, -3, 3]]
```
Twirl has a `rotate3D` (3-D rotation around the origin) method, as well as elemental rotation methods (called `roll`, `pitch`, and `yaw`).  Please refer to unit tests for details/usage.

Tests
-----

Unit tests are included in `test/`, and can be run using npm:
```
$ npm test
```
