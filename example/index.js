var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var _ = require('lodash');
var getArgumentNames = require('get-parameter-names');

var cfg = {
    statics: __dirname + '/app',
    referer: 'http://localhost:3000/'
};

var get = function(name) {
    return global.app._container[name];
};
global.app = {
    _container: {},
    value: function(name, value) {
        this._container[name] = value;
    },
    factory: function(name, factory) {
        this._container[name] = factory.apply(null, getArgumentNames(factory).map(get));
    }
};
global.React = require('react');
require(cfg.statics + '/js/CommentListComponent');
require(cfg.statics + '/js/CommentsComponent');
require(cfg.statics + '/js/guid');
require(cfg.statics + '/js/EventEmitter');
require(cfg.statics + '/js/dispatcher');
require(cfg.statics + '/js/actionTypes');
require(cfg.statics + '/js/actionCreators');

var app = express();

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());

function CommentStore() {
    get('EventEmitter').call(this);
    this.comments = [
        {
            guid: get('guid')(),
            content: 'This is awesome'
        },
        {
            guid: get('guid')(),
            content: 'I agree'
        },
        {
            guid: get('guid')(),
            content: 'First'
        }
    ];
}
CommentStore.prototype = _.create(get('EventEmitter').prototype, {
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

var commentStore = new CommentStore();
get('dispatcher').addListener(function(action) {
    if(action.actionType === get('actionTypes').ADD_COMMENT) {
        commentStore.addComment(action.item);
    }
    commentStore.emitChange();
});
app.get('/comments', function (req, res) {
    res.send(commentStore.comments);
});

app.get('/events', function(req, res) {
    get('dispatcher').once(function(action) {
        res.status(200).send([action]);
    });
});

app.post('/comments', function(req, res) {
    var comment = req.body;
    if(!comment.guid) {
        comment.guid = get('guid')();
    }
    process.nextTick(function() {
        get('actionCreators').addComment(comment);
    });
    if(req.cookies.js === 'no') {
        res.redirect(303, '/');
    } else {
        res.send(201);
    }
});

app.get('/', function(req, res) {
    if(req.cookies.js === 'no') {
        var str = '<!doctype html><html lang="en"><head><title>ngreact</title><meta charset="utf-8"></head><body>';
        str += global.React.renderComponentToStaticMarkup(get('CommentsComponent')({
            comments: commentStore.comments
        }));
        str += '</body></html>';
        res.send(str);
    } else if(req.cookies.js === 'yes') {
        res.sendFile(cfg.statics + '/index.html');
    } else {
        if(req.headers.referer === cfg.referer) {
            res.send('no cookies');
        } else {
            res.cookie('js', 'no');
            res.sendFile(cfg.statics + '/index.html');
        }
    }
});
app.use(express.static('app'));
app.listen(3000);
