var epsilon = 0.0001;

// Find the converging point of a decreasing function.
// TODO(zach): use newton's method
var convergentDomain = function(fn, threshold) {
    var i = 0;
    var x = fn(i);
    var oldX;
    for(i = 1; true; i++) {
        oldX = x;
        x = fn(i);
        if (oldX - x < threshold) {
            break;
        }
    }
    return i;
};

var springEaseGen = function(stiffness, mass, damping) {
    var k = stiffness;
    var m = mass;
    var c = damping;

    var omega = Math.sqrt(k/m);
    var zeta = c / (2 * Math.sqrt(m*k));

    var quadTmp = Math.sqrt(Math.pow(c, 2) - 4 * Math.pow(omega, 2));
    var gammaPlus = 0.5 * (-c + quadTmp);
    var gammaMinus = 0.5 * (-c - quadTmp);

    var displacementFunc;
    if (zeta - 1 < epsilon) {
        displacementFunc = function(x0, v0, t) {
            var A = x0;
            var B = v0 + omega * x0;

            return (A + B * t) * Math.exp(-omega * t);
        };
    } else if (zeta > 1) {
        displacementFunc = function(x0, v0, t) {
            var A = x0 + (gammaPlus * x0 - v0) / (gammaMinus - gammaPlus);
            var B = -1 * (gammaPlus * x0 - v0) / (gammaMinus - gammaPlus);

            return A * Math.exp(gammaPlus * t) + B * Math.exp(gammaMinus * t);
        };
    } else {
        throw "underdamping not implemented";
    }

    displacementFunc = displacementFunc.bind(null, 1, 0);

    var totalTime = convergentDomain(displacementFunc, 0.001);
    var normSpringEase = function(t) {
        t *= totalTime;
        return 1 - displacementFunc(t);
    };

    return function springEase(t, b, _c, d) {
        var normT = t / d;
        var c = _c - b;
        return normSpringEase(normT) * c + b;
    };
};

module.exports = springEaseGen;
