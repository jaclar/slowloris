/**
 * Slow Loris event queuer and bulk processor
 */

/**
 * Helper function to call the processor and clean up the queue.
 *
 * The processor is called passing through the following parameters:
 *
 *   queue: array of all events received and queued since the last call,
 *   last: last element of the array.
 *
 * @api private
 */
var fire = function () {
    this.processor(this.queue, this.queue[this.queue.length - 1]);
    this.queue = [];
};

/**
 * Constructor to set up rate limiter.
 *
 * @param {number} Minimum time between successive processor calls.
 * @param {function} Processor function that will be called untill the stream of
 *   events dries up.
 */
var Limiter = function (interval, processor) {
    this.interval = interval;
    this.processor = processor;
    this.queue = [];
};

/**
 * Register data event at limiter.
 *
 * @param {object} Event to be pushed into the queue.
 */
Limiter.prototype.event = function (data) {
    var self = this;
    this.queue.push(data);
    if (!this.pushing) {
        fire.call(this);
        // set up interval to process data queue periodically
        this.pushing = setInterval(function () {
            if (self.queue.length) {
                fire.call(self);
            } else {
                // the queue is empty so stop the interval
                clearInterval(self.pushing);
                delete self.pushing;
            }
        }, this.interval);
    }
};

exports.Limiter = Limiter;
