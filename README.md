# Slow Loris

Slow Loris is a small library to queue events and bulk process them in a specified interval

## How to use

```js
var Limiter = require("slowloris").Limiter;

var startTime = new Date().getTime(),
    counter = 0;

var l = new Limiter(500, function (d) {
    var now = new Date().getTime();
    console.log((now - startTime) + ": [" + d.queue.length + "] " + d.last);
    startTime = now;
});

var inter = setInterval(function () {
    l.event(counter);
    counter += 1;
    if (counter > 1200) {
        clearInterval(inter);
    }
}, 10);
```
