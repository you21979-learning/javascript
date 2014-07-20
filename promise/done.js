"use strict"
var Promise = require('bluebird');
var domain = require('domain');

var d = domain.create();

d.on('error', function(err){
    console.log('domain');
});
d.run(function(){
    Promise.resolve("no json")
    .then(function (data) {
        console.log('then1 a');
        JSON.parse(data);
        console.log('then1 b');
    })
    .then(function (data) {
        console.log('then2');
    })
    .catch(function (data) {
        console.log('catch');
        return "{}";
    })
    .then(function (data) {
        console.log('then3');
        console.log(data);
    })
    .done(function (data) {
        console.log('done a');
        JSON.parse(data);
        console.log('done b');
    });

});
