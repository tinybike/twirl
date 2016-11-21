"use strict";

var assert = require("chai").assert;
var twirl = require("../");
var EPSILON = 1e-12;

// TODO unit tests for 3-D functions

describe("translate", function () {
    var test = function (t) {
        it(t.description, function () {
            var output = twirl.translate([t.x, t.y], t.coords);
            t.assertions(output);
        });
    };
    test({
        description: "1 coordinate pair, no translation",
        x: 0,
        y: 0,
        coords: [
            [4, 2]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [4, 2]
            ]);
        }
    });
    test({
        description: "1 coordinate pair, +2 horizontal, 0 vertical",
        x: 2,
        y: 0,
        coords: [
            [4, 2]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [6, 2]
            ]);
        }
    });
    test({
        description: "2 coordinate pairs, -2 horizontal, 0 vertical",
        x: -2,
        y: 0,
        coords: [
            [4, 2],
            [8, 5]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [2, 2],
                [6, 5]
            ]);
        }
    });
    test({
        description: "2 coordinate pairs, -2 horizontal, 3 vertical",
        x: -2,
        y: 3,
        coords: [
            [4, 2],
            [8, 5]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [2, 5],
                [6, 8]
            ]);
        }
    });
    test({
        description: "3 coordinate pairs, -2 horizontal, 3 vertical",
        x: -2,
        y: 3,
        coords: [
            [4, 2],
            [8, 5],
            [1, 1]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [2, 5],
                [6, 8],
                [-1, 4]
            ]);
        }
    });
});

describe("scale", function () {
    var test = function (t) {
        it(t.description, function () {
            var output = twirl.scale(t.scalingFactor, t.coords);
            t.assertions(output);
        });
    };
    test({
        description: "2 coordinate pairs, no scaling",
        scalingFactor: 1,
        coords: [
            [4, 2],
            [1, 2]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [4, 2],
                [1, 2]
            ]);
        }
    });
    test({
        description: "3 coordinate pairs, x1.1 scaling",
        scalingFactor: 1.1,
        coords: [
            [4, 2],
            [1, 2],
            [0, 0]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [4.4, 2.2],
                [1.1, 2.2],
                [0, 0]
            ]);
        }
    });
    test({
        description: "1 coordinate pair, x2 scaling",
        scalingFactor: 2,
        coords: [
            [4, 2]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [8, 4]
            ]);
        }
    });
    test({
        description: "1 coordinate pair, x0.1 scaling",
        scalingFactor: 0.1,
        coords: [
            [4, 2]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [0.4, 0.2]
            ]);
        }
    });
});

describe("rotate", function () {
    var test = function (t) {
        it(t.description, function () {
            var output = twirl.rotate(t.angle, t.coords);
            t.assertions(output);
        });
    };
    test({
        description: "2 coordinate pairs, 0 degree rotation",
        angle: 0,
        coords: [
            [4, 2],
            [1, 2]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [4, 2],
                [1, 2]
            ]);
        }
    });
    test({
        description: "3 coordinate pairs, 0 degree rotation",
        angle: 0,
        coords: [
            [4, 2],
            [1, 2],
            [0, 0]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [4, 2],
                [1, 2],
                [0, 0]
            ]);
        }
    });
    test({
        description: "1 coordinate pair, 90 degree rotation",
        angle: 90,
        coords: [
            [0, 2]
        ],
        assertions: function (output) {
            var expected = [
                [-2, 0]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "2 coordinate pairs, 90 degree rotation",
        angle: 90,
        coords: [
            [0, 2],
            [1, 0]
        ],
        assertions: function (output) {
            var expected = [
                [-2, 0],
                [0, 1]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "3 coordinate pairs, 90 degree rotation",
        angle: 90,
        coords: [
            [0, 1],
            [1, 2],
            [0, 0]
        ],
        assertions: function (output) {
            var expected = [
                [-1, 0],
                [-2, 1],
                [0, 0]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "2 coordinate pairs, 30 degree rotation",
        angle: 30,
        coords: [
            [4, 2],
            [1, 2]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [2.464101615137755, 3.732050807568877],
                [-0.13397459621556118, 2.232050807568877]
            ]);
        }
    });
    test({
        description: "3 coordinate pairs, 30 degree rotation",
        angle: 30,
        coords: [
            [4, 2],
            [1, 2],
            [0, 0]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [2.464101615137755, 3.732050807568877],
                [-0.13397459621556118, 2.232050807568877],
                [0, 0]
            ]);
        }
    });
});

describe("twirl", function () {
    var test = function (t) {
        it(t.description, function () {
            var output;
            try {
                output = twirl.twirl(t.angle, t.rotationCenter, t.scalingFactor, t.coords);
            } catch (exc) {
                return t.assertions(exc);
            }
            t.assertions(output);
        });
    };
    test({
        description: "2 coordinate pairs, no rotation, no scaling",
        angle: 0,
        rotationCenter: null,
        scalingFactor: 1,
        coords: [
            [4, 2],
            [1, 2]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [4, 2],
                [1, 2]
            ]);
        }
    });
    test({
        description: "null coordinate array, no rotation, no scaling",
        angle: 0,
        rotationCenter: null,
        scalingFactor: 1,
        coords: null,
        assertions: function (output) {
            assert.strictEqual(output.message, "Expected nested array coords: [[1, 2], [3, 4], ...]");
        }
    });
    test({
        description: "empty coordinate array, no rotation, no scaling",
        angle: 0,
        rotationCenter: null,
        scalingFactor: 1,
        coords: [],
        assertions: function (output) {
            assert.strictEqual(output.message, "Expected nested array coords: [[1, 2], [3, 4], ...]");
        }
    });
    test({
        description: "empty coordinate subarray, no rotation, no scaling",
        angle: 0,
        rotationCenter: null,
        scalingFactor: 1,
        coords: [[], []],
        assertions: function (output) {
            assert.strictEqual(output.message, "Expected nested array coords: [[1, 2], [3, 4], ...]");
        }
    });
    test({
        description: "2 coordinate pairs, 90 degree rotation around (1,1), no scaling",
        angle: 90,
        rotationCenter: [1, 1],
        scalingFactor: null,
        coords: [
            [3, 1],
            [1, 0]
        ],
        assertions: function (output) {
            var expected = [
                [1, 3],
                [2, 1]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "3 coordinate pairs, 90 degree rotation around (1,1), no scaling",
        angle: 90,
        rotationCenter: [1, 1],
        scalingFactor: null,
        coords: [
            [3, 1],
            [1, 0],
            [0, 2]
        ],
        assertions: function (output) {
            var expected = [
                [1, 3],
                [2, 1],
                [0, 0]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "2 coordinate pairs, 30 degree rotation around (8,10), no scaling",
        angle: 30,
        rotationCenter: [8, 10],
        scalingFactor: null,
        coords: [
            [4, 2],
            [1, 2]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [8.535898384862245, 1.0717967697244912],
                [5.937822173508929, -0.4282032302755088]
            ]);
        }
    });
    test({
        description: "3 coordinate pairs, 30 degree rotation around (8,10), x1.1 scaling",
        angle: 30,
        rotationCenter: [8, 10],
        scalingFactor: 1.1,
        coords: [
            [4, 2],
            [1, 2],
            [0, 0]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [8.58948822334847, 0.17897644669693946],
                [5.731604390859821, -1.471023553303061],
                [5.878976446696939, -3.926279441628827]
            ]);
        }
    });
    test({
        description: "1 coordinate pair, 30 degree rotation around (0,0), x2 scaling",
        angle: 30,
        rotationCenter: [0, 0],
        scalingFactor: 2,
        coords: [
            [4, 2]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [4.92820323027551, 7.464101615137754]
            ]);
        }
    });
    test({
        description: "1 coordinate pair, 30 degree rotation around (8,10), x2 scaling",
        angle: 30,
        rotationCenter: [8, 10],
        scalingFactor: 2,
        coords: [
            [4, 2]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [9.07179676972449, -7.8564064605510175]
            ]);
        }
    });
    test({
        description: "1 coordinate pair, no rotation, x2 scaling",
        angle: 0,
        rotationCenter: null,
        scalingFactor: 2,
        coords: [
            [4, 2]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [8, 4]
            ]);
        }
    });
    test({
        description: "1 coordinate pair, null rotation, x2 scaling",
        angle: null,
        rotationCenter: null,
        scalingFactor: 2,
        coords: [
            [4, 2]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [8, 4]
            ]);
        }
    });
});
