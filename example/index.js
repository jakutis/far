var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var _ = require('lodash');
var getArgumentNames = require('get-parameter-names');

var cfg = {
    statics: __dirname + '/app',
    referer: 'http://localhost:3000/'
};

global.app = {
    _container: {},
    get: function(name) {
        return this._container[name];
    },
    value: function(name, value) {
        this._container[name] = value;
    },
    factory: function(name, factory) {
        this._container[name] = factory.apply(null, getArgumentNames(factory).map(this.get, this));
    }
};
global.React = require('react');
require(cfg.statics + '/js/CommentListComponent');
require(cfg.statics + '/js/CommentsComponent');

var app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());

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
        if(this.comments.every(function(c) {
            return c.guid !== comment.guid;
        })) {
            this.comments.push(comment);
        }
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
    var comment = req.body;
    if(!comment.guid) {
        comment.guid = guid();
    }
    commentActions.addComment(comment);
    if(req.cookies.js === 'no') {
        res.redirect(303, '/');
    } else {
        res.send(201);
    }
});

function nojs(res) {
    var str = '<!doctype html><html lang="en"><head><title>ngreact</title><meta charset="utf-8"></head><body>';
    var CommentsComponent = global.app.get('CommentsComponent');
    str += global.React.renderComponentToStaticMarkup(CommentsComponent({
        comments: commentStore.comments
    }));
    str += '</body></html>';

    res.send(str);
}

app.get('/', function(req, res) {
    console.log('referer', req.headers.referer);
    if(req.cookies.js === 'no') {
        console.log('one');
        nojs(res);
    } else if(req.cookies.js === 'yes') {
        console.log('two');
        res.sendFile(cfg.statics + '/index.html');
    } else {
        if(req.headers.referer === cfg.referer) {
            console.log('three');
            res.send('no cookies');
        } else {
            console.log('four');
            res.cookie('js', 'no');
            res.sendFile(cfg.statics + '/index.html');
        }
    }
});
app.use(express.static('app'));
app.listen(3000);
