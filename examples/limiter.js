var Limiter = require("../index.js").Limiter;

var startTime = new Date().getTime(),
    counter = 0;

var l = new Limiter(500, function (queue, last) {
    var now = new Date().getTime();
    console.log((now - startTime) + ": [" + queue.length + "] " + last);
    startTime = now;
});

var inter = setInterval(function () {
    l.event(counter);
    counter += 1;
    if (counter > 350) {
        clearInterval(inter);
    }
}, 10);
