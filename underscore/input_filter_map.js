var _ = require('underscore');
var input = function(){return [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]}

var odd = _.map(_.filter(input(),function(v){return v % 2 === 1}), function(v){ return {id:v} })
var even = _.map(_.filter(input(),function(v){return v % 2 === 0}), function(v){ return {id:v} })
console.log(odd);
console.log(even);

var odd2 = input().filter(function(v){return v % 2 === 1}).map(function(v){return {id:v}})
var even2 = input().filter(function(v){return v % 2 === 0}).map(function(v){return {id:v}})
console.log(odd2);
console.log(even2);
