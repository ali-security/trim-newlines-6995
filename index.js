'use strict';

var fn = module.exports = function (x) {
    return fn.end(fn.start(x))
}

fn.start = function (x) {
    var end = x.length;
    var start = 0;

    while (start < end && (x[start] === '\r' || x[start] === '\n')) {
        start++;
    }

    return start > 0 ? x.slice(start, end) : x;
};

fn.end = function (x) {
    var end = x.length;

    while (end > 0 && (x[end - 1] === '\r' || x[end - 1] === '\n')) {
        end--;
    }

    return end < x.length ? x.slice(0, end) : x;
};
