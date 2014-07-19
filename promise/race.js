"use strict"
var Promise = require('bluebird');

var p1 = new Promise(function(resolve, reject) { setTimeout(resolve, 500, "one"); });
var p2 = new Promise(function(resolve, reject) { setTimeout(resolve, 100, "two"); });

Promise.race([p1, p2]).then(function(value) {
    console.log(value);
});

var p3 = new Promise(function(resolve, reject) { setTimeout(resolve, 100, "three"); });
var p4 = new Promise(function(resolve, reject) { setTimeout(reject, 500, "four"); });

Promise.race([p3, p4]).then(function(value) {
    console.log(value);
}, function(reason) {
// dont call
});

var p5 = new Promise(function(resolve, reject) { setTimeout(resolve, 500, "five"); });
var p6 = new Promise(function(resolve, reject) { setTimeout(reject, 100, "six"); });

Promise.race([p5, p6]).then(function(value) {
// dont call
}, function(reason) {
    console.log(reason);
});
