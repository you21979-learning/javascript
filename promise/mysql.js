"use strict"
var mysql = require('mysql');
var Promise = require('bluebird');


var MysqlPromise = function(conn){
    this.conn = conn;
}
MysqlPromise.prototype.query = function(query, params){
    var defer = Promise.defer();
    this.conn.query(query, params, function(err, data){
        if(err) return defer.reject(err);
        defer.resolve(data);
    });
    return defer.promise;
}

var pool = mysql.createPool({
    host : 'localhost',
    user : 'root',
    database : 'kumacoin',
});
var MysqlPromiseCreate = function(pool, f){
    pool.getConnection(function(err, conn){
        if(err)return;
        var mp = new MysqlPromise(conn);
        f(mp)
        .done(function(){
            pool.releaseConnection(conn);
        });
    });
}
MysqlPromiseCreate(pool, function(mp){
    return mp.query('begin', [])
    .then(function(){
        return mp.query('select * from transactions;', []);
    })
    .map(function(data){
        return data['txid'];
    })
    .delay(10000)
    .then(function(data){
        return Promise.all(data.filter(function (x, i, self) {return self.indexOf(x) === i;})
        .map(function(txid){
            return mp.query('select * from transactions where txid=?;', [txid]);
        }));
    })
    .then(function(data){
        console.log(data);
        return mp.query('commit');
    })
    .catch(function(err){
        console.log(err.stack);
        return mp.query('rollback');
    });
});

