(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
var twirl = global.twirl || require("./");
global.twirl = twirl;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./":2}],2:[function(require,module,exports){
/**
 * Twirl: zoom and rotate around arbitrary points in 2-D and 3-D.
 * (Uses the z-y'-x'' intrinsic rotation convention for 3-D rotations.)
 * @author Jack Peterson (jack@tinybike.net)
 */

"use strict";

function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

module.exports = {

    /**
     * 2-D rotate/zoom.
     * @param {number} angle Rotation angle in degrees counter-clockwise.
     * @param {array=} center Center of rotation as an array [x, y] (default: [0, 0]).
     * @param {number=} scale Scaling (zoom) factor (default: 1).
     * @param {array} coords Coordinates to rotate/zoom as an array-of-arrays.
     * @return {array} Rotated/zoomed coordinates as an array-of-arrays.
     */
    rotateZoom: function (angle, center, scale, coords) {
        if (!coords || !coords[0] || coords[0].length !== 2) {
            throw new Error("Expected nested array coords: [[1, 2], [3, 4], ...]");
        }
        if (scale === null || scale === undefined) {
            scale = 1;
        }
        if (!center || center.length !== 2) {
            center = [0, 0];
        }
        if (!angle) {
            return this.zoom(scale, coords);
        }
        return this.translate(
            center,
            this.zoom(
                scale,
                this.rotate(angle,
                    this.translate([-center[0], -center[1]], coords)
                )
            )
        );
    },

    /**
     * 2-D rotation around the origin.
     * @param {number} angle Rotation angle in degrees counter-clockwise.
     * @param {array} coords Coordinates to rotate as an array-of-arrays.
     * @return {array} Rotated coordinates as an array-of-arrays.
     */
    rotate: function (angle, coords) {
        var radians = degreesToRadians(angle);
        var numCoords = coords.length;
        var newCoords = new Array(numCoords);
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        for (var i = 0; i < numCoords; ++i) {
            newCoords[i] = [
                cos*coords[i][0] - sin*coords[i][1],
                sin*coords[i][0] + cos*coords[i][1]
            ];
        }
        return newCoords;
    },

    /**
     * 3-D rotate/zoom: roll, pitch, and yaw are principal axis rotations
     * (Tait-Bryan angles).
     * @param {number} roll Roll angle in degrees counter-clockwise.
     * @param {number} pitch Pitch angle in degrees counter-clockwise.
     * @param {number} yaw Yaw angle in degrees counter-clockwise.
     * @param {array=} center Center of rotation as an array [x, y, z] (default: [0, 0, 0]).
     * @param {number=} scale Scaling (zoom) factor (default: 1).
     * @param {array} coords Coordinates to rotate/zoom as an array-of-arrays.
     * @return {array} Rotated/zoomed coordinates as an array-of-arrays.
     */
    rotateZoom3D: function (roll, pitch, yaw, center, scale, coords) {
        if (!coords || !coords[0] || coords[0].length !== 3) {
            throw new Error("Expected nested array coords: [[1, 2, 3], [4, 5, 6], ...]");
        }
        if (scale === null || scale === undefined) {
            scale = 1;
        }
        if (!center || center.length !== 3) {
            center = [0, 0, 0];
        }
        if (!roll && !pitch && !yaw) {
            return this.zoom(scale, coords);
        }
        return this.translate(
            center,
            this.zoom(
                scale,
                this.rotate3D(
                    roll,
                    pitch,
                    yaw,
                    this.translate([-center[0], -center[1], -center[2]], coords)
                )
            )
        );
    },

    /**
     * Rotation around the x-axis in 3-D.
     * @param {number} angle Rotation angle in degrees counter-clockwise.
     * @param {array} coords Coordinates to rotate as an array-of-arrays.
     * @return {array} Rotated coordinates as an array-of-arrays.
     */
    roll: function (angle, coords) {
        var radians = degreesToRadians(angle);
        var numCoords = coords.length;
        var newCoords = new Array(numCoords);
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        for (var i = 0; i < numCoords; ++i) {
            newCoords[i] = [
                coords[i][0],
                cos*coords[i][1] - sin*coords[i][2],
                sin*coords[i][1] + cos*coords[i][2]
            ];
        }
        return newCoords;
    },

    /**
     * Rotation around the y-axis in 3-D.
     * @param {number} angle Rotation angle in degrees counter-clockwise.
     * @param {array} coords Coordinates to rotate as an array-of-arrays.
     * @return {array} Rotated coordinates as an array-of-arrays.
     */
    pitch: function (angle, coords) {
        var radians = degreesToRadians(angle);
        var numCoords = coords.length;
        var newCoords = new Array(numCoords);
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        for (var i = 0; i < numCoords; ++i) {
            newCoords[i] = [
                cos*coords[i][0] + sin*coords[i][2],
                coords[i][1],
                -sin*coords[i][0] + cos*coords[i][2]
            ];
        }
        return newCoords;
    },

    /**
     * Rotation around the z-axis in 3-D.
     * @param {number} angle Rotation angle in degrees counter-clockwise.
     * @param {array} coords Coordinates to rotate as an array-of-arrays.
     * @return {array} Rotated coordinates as an array-of-arrays.
     */
    yaw: function (angle, coords) {
        var radians = degreesToRadians(angle);
        var numCoords = coords.length;
        var newCoords = new Array(numCoords);
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        for (var i = 0; i < numCoords; ++i) {
            newCoords[i] = [
                cos*coords[i][0] - sin*coords[i][1],
                sin*coords[i][0] + cos*coords[i][1],
                coords[i][2]
            ];
        }
        return newCoords;
    },

    /**
     * 3-D rotation around the origin.  Elemental rotations are applied in
     * the following order: yaw, pitch, roll.
     * @param {number} roll Roll angle in degrees counter-clockwise.
     * @param {number} pitch Pitch angle in degrees counter-clockwise.
     * @param {number} yaw Yaw angle in degrees counter-clockwise.
     * @param {array} coords Coordinates to rotate as an array-of-arrays.
     * @return {array} Rotated coordinates as an array-of-arrays.
     */
    rotate3D: function (roll, pitch, yaw, coords) {
        var newCoords = coords;
        if (coords && coords.length) {
            if (yaw) {
                newCoords = this.yaw(yaw, newCoords);
            }
            if (pitch) {
                newCoords = this.pitch(pitch, newCoords);
            }
            if (roll) {
                newCoords = this.roll(roll, newCoords);
            }
        }
        return newCoords;
    },

    /**
     * Move a point (vector) without rotating or rescaling it.
     * @param {array} translation Amounts to move ([x, y] or [x, y, z]).
     * @param {array} coords Coordinates to rotate as an array-of-arrays.
     * @return {array} Translated coordinates as an array-of-arrays.
     */
    translate: function (translation, coords) {
        var numCoords = coords.length;
        if (numCoords && coords && coords.length && coords[0] && coords[0].length) {
            var d = coords[0].length;
            var newCoords = new Array(numCoords);
            for (var i = 0; i < numCoords; ++i) {
                newCoords[i] = new Array(d);
                for (var j = 0; j < d; ++j) {
                    newCoords[i][j] = coords[i][j] + translation[j];
                }
            }
            return newCoords;
        }
        return coords;
    },

    /**
     * Zoom (rescale): multiply coordinates by a constant scaling factor.
     * @param {number=} scale Scaling (zoom) factor.
     * @param {array} coords Coordinates to rotate as an array-of-arrays.
     * @return {array} Rescaled coordinates as an array-of-arrays.
     */
    zoom: function (scale, coords) {
        var numCoords = coords.length;
        if (numCoords && coords && coords.length && coords[0] && coords[0].length) {
            var d = coords[0].length;
            var newCoords = new Array(numCoords);
            for (var i = 0; i < numCoords; ++i) {
                newCoords[i] = new Array(d);
                for (var j = 0; j < d; ++j) {
                    newCoords[i][j] = scale*coords[i][j];
                }
            }
            return newCoords;
        }
        return coords;
    }
};

},{}]},{},[1]);
