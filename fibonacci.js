// 再帰
var fib0 = function(){
    var n = 0;
    var fib = function(n){
        return n < 2 ? n : fib(n - 2) + fib(n - 1);
    }
    return function(){return fib(n++)}
}
// 蓄積１
var fib1 = function(){
    var fib = [0,1];
    var n = 0;
    return function(){
        var x = n++;
        return x < 2 ? x : (fib[x] = fib[x-2] + fib[x-1])
    }
}
// 蓄積２
var fib2 = function(){
    var a = 1,
        b = 0;
    var swp = function(a, b){
        return [b, a];
    }
    return function(){
        var w = swp(a + b, b)
        a = w[0]
        b = w[1]
        return w[0];
    }
}
// ビネの公式
var fib3 = function(){
    var SQRT_5 = Math.sqrt(5);
    var PHY = (1 + SQRT_5) / 2;
    var n = 0;
    return function(){
        return Math.round(Math.pow(PHY, n++) / SQRT_5);
    }
}
var fib = function(argo, count){
    var f = argo();
    var res = [];
    for(var i = 0; i<count; ++i){
        res.push(f());
    }
    return res;
}

var test = [fib0,fib1,fib2,fib3];
test.forEach(function(f,i){
    console.time(i);
    var res = fib(f, 30);
    console.timeEnd(i);
});
