/**
 * Twirl unit tests
 * @author Jack Peterson (jack@tinybike.net)
 */

"use strict";

var assert = require("chai").assert;
var twirl = require("../");
var EPSILON = 1e-12;

describe("translate", function () {
    var test = function (t) {
        it(t.description, function () {
            var translation = [t.x, t.y];
            if (t.z !== undefined) translation.push(t.z);
            var output = twirl.translate(translation, t.coords);
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
    test({
        description: "1 coordinate triple, no translation",
        x: 0,
        y: 0,
        z: 0,
        coords: [
            [4, 2, 9]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [4, 2, 9]
            ]);
        }
    });
    test({
        description: "1 coordinate triple, +2 horizontal, 0 vertical, 0 depth",
        x: 2,
        y: 0,
        z: 0,
        coords: [
            [4, 2, 9]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [6, 2, 9]
            ]);
        }
    });
    test({
        description: "2 coordinate triples, +2 horizontal, -1 vertical, -6 depth",
        x: 2,
        y: -1,
        z: -6,
        coords: [
            [4, 2, 9],
            [0, 0, 0]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [6, 1, 3],
                [2, -1, -6]
            ]);
        }
    });
});

describe("zoom", function () {
    var test = function (t) {
        it(t.description, function () {
            var output = twirl.zoom(t.scale, t.coords);
            t.assertions(output);
        });
    };
    test({
        description: "2 coordinate pairs, no scaling",
        scale: 1,
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
        scale: 1.1,
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
        scale: 2,
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
        scale: 0.1,
        coords: [
            [4, 2]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [0.4, 0.2]
            ]);
        }
    });
    test({
        description: "2 coordinate triples, no scaling",
        scale: 1,
        coords: [
            [4, 2, 9],
            [1, 2, 3]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [4, 2, 9],
                [1, 2, 3]
            ]);
        }
    });
    test({
        description: "3 coordinate triples, x1.1 scaling",
        scale: 1.1,
        coords: [
            [4, 2, 9],
            [1, 2, 3],
            [0, 0, 0]
        ],
        assertions: function (output) {
            var expected = [
                [4.4, 2.2, 9.9],
                [1.1, 2.2, 3.3],
                [0, 0, 0]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "3 coordinate triples, x0.1 scaling",
        scale: 0.1,
        coords: [
            [4, 2, 9],
            [1, 2, 3],
            [0, 0, 0]
        ],
        assertions: function (output) {
            var expected = [
                [0.4, 0.2, 0.9],
                [0.1, 0.2, 0.3],
                [0, 0, 0]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "3 coordinate triples, x2 scaling",
        scale: 2,
        coords: [
            [4, 2, 9],
            [1, 2, 3],
            [0, 0, 0]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [8, 4, 18],
                [2, 4, 6],
                [0, 0, 0]
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

describe("roll", function () {
    var test = function (t) {
        it(t.description, function () {
            var output = twirl.roll(t.angle, t.coords);
            t.assertions(output);
        });
    };
    test({
        description: "2 coordinate triples, 0 degree rotation",
        angle: 0,
        coords: [
            [4, 2, 9],
            [1, 2, 3]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [4, 2, 9],
                [1, 2, 3]
            ]);
        }
    });
    test({
        description: "3 coordinate triples, 0 degree rotation",
        angle: 0,
        coords: [
            [4, 2, 9],
            [1, 2, 3],
            [0, 0, 0]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [4, 2, 9],
                [1, 2, 3],
                [0, 0, 0]
            ]);
        }
    });
    test({
        description: "1 coordinate triple, 90 degree rotation",
        angle: 90,
        coords: [
            [0, 2, 0]
        ],
        assertions: function (output) {
            var expected = [
                [0, 0, 2]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "1 coordinate triple, -90 degree rotation",
        angle: -90,
        coords: [
            [0, 2, 0]
        ],
        assertions: function (output) {
            var expected = [
                [0, 0, -2]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "2 coordinate triples, 90 degree rotation",
        angle: 90,
        coords: [
            [0, 2, 0],
            [1, 0, 0]
        ],
        assertions: function (output) {
            var expected = [
                [0, 0, 2],
                [1, 0, 0]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "3 coordinate triples, 90 degree rotation",
        angle: 90,
        coords: [
            [0, 2, 0],
            [1, 0, 0],
            [1, 2, 3]
        ],
        assertions: function (output) {
            var expected = [
                [0, 0, 2],
                [1, 0, 0],
                [1, -3, 2]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "2 coordinate triples, 30 degree rotation",
        angle: 30,
        coords: [
            [4, 2, 9],
            [1, 2, 3]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [4, -2.7679491924311215, 8.794228634059948],
                [1, 0.23205080756887764, 3.598076211353316]
            ]);
        }
    });
});

describe("pitch", function () {
    var test = function (t) {
        it(t.description, function () {
            var output = twirl.pitch(t.angle, t.coords);
            t.assertions(output);
        });
    };
    test({
        description: "2 coordinate triples, 0 degree rotation",
        angle: 0,
        coords: [
            [4, 2, 9],
            [1, 2, 3]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [4, 2, 9],
                [1, 2, 3]
            ]);
        }
    });
    test({
        description: "3 coordinate triples, 0 degree rotation",
        angle: 0,
        coords: [
            [4, 2, 9],
            [1, 2, 3],
            [0, 0, 0]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [4, 2, 9],
                [1, 2, 3],
                [0, 0, 0]
            ]);
        }
    });
    test({
        description: "1 coordinate triple, 90 degree rotation",
        angle: 90,
        coords: [
            [2, 0, 0]
        ],
        assertions: function (output) {
            var expected = [
                [0, 0, -2]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "1 coordinate triple, -90 degree rotation",
        angle: -90,
        coords: [
            [2, 0, 0]
        ],
        assertions: function (output) {
            var expected = [
                [0, 0, 2]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "2 coordinate triples, 90 degree rotation",
        angle: 90,
        coords: [
            [0, 2, 0],
            [1, 0, 0]
        ],
        assertions: function (output) {
            var expected = [
                [0, 2, 0],
                [0, 0, -1]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "3 coordinate triples, 90 degree rotation",
        angle: 90,
        coords: [
            [0, 2, 0],
            [1, 0, 0],
            [1, 2, 3]
        ],
        assertions: function (output) {
            var expected = [
                [0, 2, 0],
                [0, 0, -1],
                [3, 2, -1]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "2 coordinate triples, 30 degree rotation",
        angle: 30,
        coords: [
            [4, 2, 9],
            [1, 2, 3]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [7.9641016151377535, 2, 5.794228634059948],
                [2.3660254037844384, 2, 2.098076211353316]
            ]);
        }
    });
});

describe("yaw", function () {
    var test = function (t) {
        it(t.description, function () {
            var output = twirl.yaw(t.angle, t.coords);
            t.assertions(output);
        });
    };
    test({
        description: "2 coordinate triples, 0 degree rotation",
        angle: 0,
        coords: [
            [4, 2, 9],
            [1, 2, 3]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [4, 2, 9],
                [1, 2, 3]
            ]);
        }
    });
    test({
        description: "3 coordinate triples, 0 degree rotation",
        angle: 0,
        coords: [
            [4, 2, 9],
            [1, 2, 3],
            [0, 0, 0]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [4, 2, 9],
                [1, 2, 3],
                [0, 0, 0]
            ]);
        }
    });
    test({
        description: "1 coordinate triple, 90 degree rotation",
        angle: 90,
        coords: [
            [2, 0, 0]
        ],
        assertions: function (output) {
            var expected = [
                [0, 2, 0]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "1 coordinate triple, -90 degree rotation",
        angle: -90,
        coords: [
            [2, 0, 0]
        ],
        assertions: function (output) {
            var expected = [
                [0, -2, 0]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "2 coordinate triples, 90 degree rotation",
        angle: 90,
        coords: [
            [0, 0, 2],
            [0, 1, 0]
        ],
        assertions: function (output) {
            var expected = [
                [0, 0, 2],
                [-1, 0, 0]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "3 coordinate triples, 90 degree rotation",
        angle: 90,
        coords: [
            [0, 0, 2],
            [0, 1, 0],
            [1, 2, 3]
        ],
        assertions: function (output) {
            var expected = [
                [0, 0, 2],
                [-1, 0, 0],
                [-2, 1, 3]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "2 coordinate triples, 30 degree rotation",
        angle: 30,
        coords: [
            [4, 2, 9],
            [1, 2, 3]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [2.464101615137755, 3.732050807568877, 9],
                [-0.13397459621556118, 2.232050807568877, 3]
            ]);
        }
    });
});

describe("rotate3D", function () {
    var test = function (t) {
        it(t.description, function () {
            var output = twirl.rotate3D(t.roll, t.pitch, t.yaw, t.coords);
            t.assertions(output);
        });
    };
    test({
        description: "2 coordinate triples, 0 degree rotation",
        roll: 0,
        pitch: 0,
        yaw: 0,
        coords: [
            [4, 2, 9],
            [1, 2, 3]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [4, 2, 9],
                [1, 2, 3]
            ]);
        }
    });
    test({
        description: "1 coordinate triple, 90 degree roll, 0 degree pitch, 0 degree yaw",
        roll: 90,
        pitch: 0,
        yaw: 0,
        coords: [
            [1, 2, 3]
        ],
        assertions: function (output) {
            var expected = [
                [1, -3, 2]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "1 coordinate triple, 0 degree roll, 90 degree pitch, 0 degree yaw",
        roll: 0,
        pitch: 90,
        yaw: 0,
        coords: [
            [1, 2, 3]
        ],
        assertions: function (output) {
            var expected = [
                [3, 2, -1]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "1 coordinate triple, 0 degree roll, 0 degree pitch, 90 degree yaw",
        roll: 0,
        pitch: 0,
        yaw: 90,
        coords: [
            [1, 2, 3]
        ],
        assertions: function (output) {
            var expected = [
                [-2, 1, 3]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "1 coordinate triple, 0 degree roll, 90 degree pitch, 90 degree yaw",
        roll: 0,
        pitch: 90,
        yaw: 90,
        coords: [
            [1, 2, 3]
        ],
        assertions: function (output) {
            // -> [-2, 1, 3] -> [3, 1, 2]
            var expected = [
                [3, 1, 2]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "1 coordinate triple, 90 degree roll, 90 degree pitch, 90 degree yaw",
        roll: 90,
        pitch: 90,
        yaw: 90,
        coords: [
            [1, 2, 3]
        ],
        assertions: function (output) {
            // -> [-2, 1, 3] -> [3, 1, 2] -> [3, -2, 1]
            var expected = [
                [3, -2, 1]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "2 coordinate triples, 90 degree roll, 90 degree pitch, 90 degree yaw",
        roll: 90,
        pitch: 90,
        yaw: 90,
        coords: [
            [1, 2, 3],
            [3, 2, 1]
        ],
        assertions: function (output) {
            // -> [-2, 1, 3] -> [3, 1, 2] -> [3, -2, 1]
            var expected = [
                [3, -2, 1],
                [1, -2, 3]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
});

describe("rotateZoom", function () {
    var test = function (t) {
        it(t.description, function () {
            var output;
            try {
                output = twirl.rotateZoom(t.angle, t.center, t.scale, t.coords);
            } catch (exc) {
                return t.assertions(exc);
            }
            t.assertions(output);
        });
    };
    test({
        description: "2 coordinate pairs, no rotation, no scaling",
        angle: 0,
        center: null,
        scale: 1,
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
        center: null,
        scale: 1,
        coords: null,
        assertions: function (output) {
            assert.strictEqual(output.message, "Expected nested array coords: [[1, 2], [3, 4], ...]");
        }
    });
    test({
        description: "empty coordinate array, no rotation, no scaling",
        angle: 0,
        center: null,
        scale: 1,
        coords: [],
        assertions: function (output) {
            assert.strictEqual(output.message, "Expected nested array coords: [[1, 2], [3, 4], ...]");
        }
    });
    test({
        description: "empty coordinate subarray, no rotation, no scaling",
        angle: 0,
        center: null,
        scale: 1,
        coords: [[], []],
        assertions: function (output) {
            assert.strictEqual(output.message, "Expected nested array coords: [[1, 2], [3, 4], ...]");
        }
    });
    test({
        description: "2 coordinate pairs, 90 degree rotation around (1,1), no scaling",
        angle: 90,
        center: [1, 1],
        scale: null,
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
        center: [1, 1],
        scale: null,
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
        description: "3 coordinate pairs, 90 degree rotation around (1,1), x2 scaling",
        angle: 90,
        center: [1, 1],
        scale: 2,
        coords: [
            [3, 1],
            [1, 1],
            [0, 2]
        ],
        assertions: function (output) {
            var expected = [
                [1, 5],
                [1, 1],
                [-1, -1]
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
        center: [8, 10],
        scale: null,
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
        center: [8, 10],
        scale: 1.1,
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
        center: [0, 0],
        scale: 2,
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
        center: [8, 10],
        scale: 2,
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
        center: null,
        scale: 2,
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
        center: null,
        scale: 2,
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

describe("rotateZoom3D", function () {
    var test = function (t) {
        it(t.description, function () {
            var output;
            try {
                output = twirl.rotateZoom3D(t.roll, t.pitch, t.yaw, t.center, t.scale, t.coords);
            } catch (exc) {
                return t.assertions(exc);
            }
            t.assertions(output);
        });
    };
    test({
        description: "2 coordinate triples, no rotation, no scaling",
        roll: null,
        pitch: null,
        yaw: null,
        center: null,
        scale: 1,
        coords: [
            [4, 2, 9],
            [1, 2, 3]
        ],
        assertions: function (output) {
            assert.deepEqual(output, [
                [4, 2, 9],
                [1, 2, 3]
            ]);
        }
    });
    test({
        description: "null coordinate array, no rotation, no scaling",
        roll: null,
        pitch: null,
        yaw: null,
        center: null,
        scale: 1,
        coords: null,
        assertions: function (output) {
            assert.strictEqual(output.message, "Expected nested array coords: [[1, 2, 3], [4, 5, 6], ...]");
        }
    });
    test({
        description: "empty coordinate array, no rotation, no scaling",
        roll: null,
        pitch: null,
        yaw: null,
        center: null,
        scale: 1,
        coords: [],
        assertions: function (output) {
            assert.strictEqual(output.message, "Expected nested array coords: [[1, 2, 3], [4, 5, 6], ...]");
        }
    });
    test({
        description: "empty coordinate subarray, no rotation, no scaling",
        roll: null,
        pitch: null,
        yaw: null,
        center: null,
        scale: 1,
        coords: [[], []],
        assertions: function (output) {
            assert.strictEqual(output.message, "Expected nested array coords: [[1, 2, 3], [4, 5, 6], ...]");
        }
    });
    test({
        description: "1 coordinate triple, 90 degree roll, 0 degree pitch, 0 degree yaw, center (0,0,0), no scaling",
        roll: 90,
        pitch: 0,
        yaw: 0,
        center: [0, 0, 0],
        scale: null,
        coords: [
            [0, 0, -1]
        ],
        assertions: function (output) {
            var expected = [
                [0, 1, 0]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "1 coordinate triple, 90 degree roll, 0 degree pitch, 0 degree yaw, center (1,1,1), no scaling",
        roll: 90,
        pitch: 0,
        yaw: 0,
        center: [1, 1, 1],
        scale: null,
        coords: [
            [1, 1, 0]
        ],
        assertions: function (output) {
            var expected = [
                [1, 2, 1]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "3 coordinate triples, 90 degree roll, 0 degree pitch, 0 degree yaw, center (1,1,1), no scaling",
        roll: 90,
        pitch: 0,
        yaw: 0,
        center: [1, 1, 1],
        scale: null,
        coords: [
            [0, 1, 1],
            [1, 1, 0],
            [1, 1, 1]
        ],
        assertions: function (output) {
            var expected = [
                [0, 1, 1],
                [1, 2, 1],
                [1, 1, 1]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "2 coordinate triples, 90 degree roll, 90 degree pitch, 90 degree yaw, center (1,1,1), no scaling",
        roll: 90,
        pitch: 90,
        yaw: 90,
        center: [1, 1, 1],
        scale: null,
        coords: [
            [1, 1, 1],
            [2, 3, 4]
        ],
        assertions: function (output) {
            var expected = [
                [1, 1, 1],
                [4, -1, 2]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "2 coordinate triples, 90 degree roll, 90 degree pitch, 90 degree yaw, center (1,1,1), x1.1 scaling",
        roll: 90,
        pitch: 90,
        yaw: 90,
        center: [1, 1, 1],
        scale: 1.1,
        coords: [
            [1, 1, 1],
            [2, 3, 4]
        ],
        assertions: function (output) {
            var expected = [
                [1, 1, 1],
                [4.3, -1.2, 2.1]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "2 coordinate triples, 90 degree roll, 90 degree pitch, 90 degree yaw, center (1,1,1), x2 scaling",
        roll: 90,
        pitch: 90,
        yaw: 90,
        center: [1, 1, 1],
        scale: 2,
        coords: [
            [1, 1, 1],
            [2, 3, 4]
        ],
        assertions: function (output) {
            var expected = [
                [1, 1, 1],
                [7, -3, 3]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
    test({
        description: "2 coordinate triples, 90 degree roll, 90 degree pitch, 90 degree yaw, center (1,1,1), x0.1 scaling",
        roll: 90,
        pitch: 90,
        yaw: 90,
        center: [1, 1, 1],
        scale: 0.1,
        coords: [
            [1, 1, 1],
            [2, 3, 4]
        ],
        assertions: function (output) {
            var expected = [
                [1, 1, 1],
                [1.3, 0.8, 1.1]
            ];
            for (var i = 0; i < output.length; ++i) {
                for (var j = 0; j < output[i].length; ++j) {
                    assert.closeTo(output[i][j], expected[i][j], EPSILON);
                }
            }
        }
    });
});
