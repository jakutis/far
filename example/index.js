var express = require('express');
var bodyParser = require('body-parser');
var _ = require('lodash');

var app = express();

app.use(express.static('app'));
app.use(bodyParser.json());

var actionTypes = {
    ADD_COMMENT: 'ADD_COMMENT'
};

function guid() {
    return Date.now().toString() + Math.random().toString();
}

function EventEmitter() {
    this.listeners = [];
}
EventEmitter.prototype = {
    emit: function(event) {
        process.nextTick(function() {
            console.log(event);
            this.listeners.forEach(function(listener) {
                listener(event);
            });
        }.bind(this));
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

function CommentStore() {
    EventEmitter.call(this);
    this.comments = [
        {
            guid: guid(),
            content: 'This is awesome'
        },
        {
            guid: guid(),
            content: 'I agree'
        },
        {
            guid: guid(),
            content: 'First'
        }
    ];
}
CommentStore.prototype = _.create(EventEmitter.prototype, {
    'constructor': CommentStore
});
_.assign(CommentStore.prototype, {
    comments: null,
    addComment: function(comment) {
        console.log('add comment', comment);
        this.comments.push(comment);
    },
    emitChange: function() {
        this.emit('change');
    }
});

var dispatcher = new EventEmitter();
var commentActions = {
    addComment: function(item) {
        dispatcher.emit({
            actionType: actionTypes.ADD_COMMENT,
            item: item
        });
    }
};

var commentStore = new CommentStore();
dispatcher.addListener(function(action) {
    if(action.actionType === actionTypes.ADD_COMMENT) {
        commentStore.addComment(action.item);
    }
    commentStore.emitChange();
});
app.get('/comments', function (req, res) {
    res.send(commentStore.comments);
});

app.get('/events', function(req, res) {
    dispatcher.once(function(action) {
        res.status(200).send([action]);
    });
});

app.post('/comments', function(req, res) {
    commentActions.addComment(req.body);
    res.send(201);
});

app.listen(3000);
