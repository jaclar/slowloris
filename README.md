# Slow Loris

Slow Loris is a small library to queue events and bulk process them in a specified interval.

## How to use

```js
var Limiter = require("slowloris").Limiter;

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
    if (counter > 1200) {
        clearInterval(inter);
    }
}, 10);
```

## Notes

Once the ```Limiter``` is set up, new events are captured in its events queue through ```event``` calls. On the first event received, ```Limiter``` will call the processor but subsequent events will be queued until the interval set during initialization passes by.

The events processor function will always receive the queue of events received during the interval and a reference to the last of those events.
