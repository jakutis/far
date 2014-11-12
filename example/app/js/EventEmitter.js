app.factory('EventEmitter', function() {
    function EventEmitter() {
        this.listeners = [];
    }
    EventEmitter.prototype = {
        emit: function(event) {
            console.log('emit', event);
            this.listeners.forEach(function(listener) {
                listener(event);
            });
        },
        addListener: function(listener) {
            this.listeners.push(listener);
        },
        removeListener: function(listener) {
            this.listeners = this.listeners.filter(function(l) {
                return l !== listener;
            });
        },
        once: function(listener) {
            var onceListener = function(event) {
                listener(event);
                this.removeListener(onceListener);
            }.bind(this);
            this.addListener(onceListener);
        }
    };
    return EventEmitter;
});
