"use strict"
var fs = require('fs');
var Promise = require('bluebird');

var read = function(file, c){
    var defer = Promise.defer();
    fs.readFile(file, c, function(err, data){
        if(err) return defer.reject(err);
        defer.resolve(data);
    });
    return defer.promise;
}

var fileread = function(file, opt){
    var set = function(name){
        return function(data){
            return {name:name, data:data};
        }
    }
    return read(file, opt).then(set(file));
}

var pallarel1 = function(){
    var tasks = [__filename, './package.json'];
    return Promise.all(tasks.map(function(file){
        return fileread(file, 'utf-8');
    }));
}
var pallarel2 = function(){
    var tasks = [fileread(__filename, 'utf-8'), fileread('./package.json', 'utf-8')];
    return Promise.all(tasks);
}
var pallarel3 = function(){
    var tasks = [];
    tasks.push(function(){return fileread(__filename, 'utf-8')});
    tasks.push(function(){return fileread('./package.json', 'utf-8')});
    return Promise.all(tasks.map(function(promise){
        return promise();
    }));
}
var concurrent = function(){
    var tasks = [];
    tasks.push(function(){return fileread(__filename, 'utf-8')});
    tasks.push(function(){return fileread('./package.json', 'utf-8')});
    return tasks.reduce(function(promise){
        return promise();
    });
}
Promise.all([pallarel1().delay(1), pallarel2().delay(1), pallarel3().delay(1), concurrent().delay(1)])
    .catch(function(err){ console.log(err); })
    .done(function(data){ console.log('num:', data.length); });

