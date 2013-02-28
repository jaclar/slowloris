/**
 * Slow Loris event queuer and bulk processor
 */

/**
 * helper function to call the processor and clean the queue
 *
 * @api private
 */
var fire = function () {
    var self = this;
    self.processor({ queue: self.queue,
                     last: self.queue[self.queue.length - 1] });
    self.queue = [];
};

/**
 * Constructor to set up rate limiter.
 *
 * The processor will be called till the stream of events dried up.
 * Call signature: { queue: <array> all events till last call,
 *                   last: last element of array }
 *
 * @param interval minimum time between successive processor calls
 * @param processor function to process data
 */
var Limiter = function (interval, processor) {
    this.interval = interval;
    this.processor = processor;
    this.queue = [];
};

/**
 * register data event at limiter.
 *
 * @param data event to be pushed into the queue
 */
Limiter.prototype.event = function (data) {
    var self = this;
    self.queue.push(data);
    if (!self.pushing) {
        fire.call(self);
        // set up interval to process data queue periodically
        self.pushing = setInterval(function () {
            if (self.queue.length) {
                fire.call(self);
            } else {
                // if the queue is empty we stop the interval
                clearInterval(self.pushing);
                delete self.pushing;
            }
        }, self.interval);
    }
};

exports.Limiter = Limiter;
