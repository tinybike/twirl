/**
 * Twirl: move, rotate, and scale points in 2-D and 3-D.
 * @author Jack Peterson (jack@tinybike.net)
 */

"use strict";

module.exports = {

    degreesToRadians: function (degrees) {
        return degrees * Math.PI / 180;
    },

    // Rotate and scale in 2-D
    twirl: function (angle, rotationCenter, scalingFactor, coords) {
        if (!coords || !coords[0] || !coords[0].length) {
            throw new Error("Expected nested array coords: [[1, 2], [3, 4], ...]");
        }
        if (scalingFactor === null || scalingFactor === undefined) {
            scalingFactor = 1;
        }
        if (!rotationCenter || !rotationCenter.length) {
            rotationCenter = [0, 0];
        }
        if (!angle) {
            return this.scale(scalingFactor, coords);
        }
        var newCoords = this.translate([-rotationCenter[0], -rotationCenter[1]], coords);
        var rotatedCoords = this.rotate(angle, newCoords);
        var rescaledRotatedCoords = this.scale(scalingFactor, rotatedCoords);
        return this.translate(rotationCenter, rescaledRotatedCoords);
    },

    // 2-D rotation
    rotate: function (angle, coords) {
        var radians = this.degreesToRadians(angle);
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

    // Rotate and scale in 3-D
    twirl3d: function (angles, rotationCenter, scalingFactor, coords) {
        if (!coords || !coords[0] || !coords[0].length) {
            throw new Error("Expected nested array coords: [[1, 2, 3], [4, 5, 6], ...]");
        }
        if (scalingFactor === null || scalingFactor === undefined) {
            scalingFactor = 1;
        }
        if (!rotationCenter || !rotationCenter.length) {
            rotationCenter = [0, 0, 0];
        }
        if (!angles) {
            return this.scale(scalingFactor, coords);
        }
        var newCoords = this.translate([-rotationCenter[0], -rotationCenter[1], -rotationCenter[2]], coords);
        var rotatedCoords = this.rotate3d(angles[0], angles[1], angles[2], newCoords);
        var rescaledRotatedCoords = this.scale(scalingFactor, rotatedCoords);
        return this.translate(rotationCenter, rescaledRotatedCoords);
    },

    // x-axis rotation (3-D)
    roll: function (angle, coords) {
        var radians = this.degreesToRadians(angle);
        var numCoords = coords.length;
        var newCoords = new Array(numCoords);
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        for (var i = 0; i < numCoords; ++i) {
            newCoords = [
                coords[i][0],
                cos*coords[i][1] - sin*coords[i][2],
                sin*coords[i][1] + cos*coords[i][2]
            ];
        }
        return newCoords;
    },

    // y-axis rotation (3-D)
    pitch: function (angle, coords) {
        var radians = this.degreesToRadians(angle);
        var numCoords = coords.length;
        var newCoords = new Array(numCoords);
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        for (var i = 0; i < numCoords; ++i) {
            newCoords = [
                cos*coords[i][0] + sin*coords[i][2],
                coords[i][1],
                -sin*coords[i][0] + cos*coords[i][2]
            ];
        }
        return newCoords;
    },

    // z-axis rotation (3-D)
    yaw: function (angle, coords) {
        var radians = this.degreesToRadians(angle);
        var numCoords = coords.length;
        var newCoords = new Array(numCoords);
        var cos = Math.cos(radians);
        var sin = Math.sin(radians);
        for (var i = 0; i < numCoords; ++i) {
            newCoords = [
                cos*coords[i][0] - sin*coords[i][1],
                sin*coords[i][0] + cos*coords[i][1],
                coords[i][2]
            ];
        }
        return newCoords;
    },

    // 3-D rotation
    rotate3d: function (x, y, z, coords) {
        var newCoords = coords;
        if (coords && coords.length) {
            if (x) {
                newCoords = this.roll(x, newCoords);
            }
            if (y) {
                newCoords = this.pitch(y, newCoords);
            }
            if (z) {
                newCoords = this.yaw(z, newCoords);
            }
        }
        return newCoords;
    },

    // move: [x, y] or [x, y, z]
    translate: function (move, coords) {
        var numCoords = coords.length;
        if (numCoords && coords && coords.length && coords[0] && coords[0].length) {
            var d = coords[0].length;
            var newCoords = new Array(numCoords);
            for (var i = 0; i < numCoords; ++i) {
                newCoords[i] = new Array(d);
                for (var j = 0; j < d; ++j) {
                    newCoords[i][j] = coords[i][j] + move[j];
                }
            }
            return newCoords;
        }
        return coords;
    },

    // rescale: multiply all coordinates by a scaling factor
    scale: function (scalingFactor, coords) {
        var numCoords = coords.length;
        if (numCoords && coords && coords.length && coords[0] && coords[0].length) {
            var d = coords[0].length;
            var newCoords = new Array(numCoords);
            for (var i = 0; i < numCoords; ++i) {
                newCoords[i] = new Array(d);
                for (var j = 0; j < d; ++j) {
                    newCoords[i][j] = scalingFactor*coords[i][j];
                }
            }
            return newCoords;
        }
        return coords;
    }
};
