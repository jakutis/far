var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var getArgumentNames = require('get-parameter-names');

var get = function(name) {
    return global.app._container[name];
};
global.app = {
    _container: {
    },
    value: function(name, value) {
        this._container[name] = value;
    },
    factory: function(name, factory) {
        this._container[name] = factory.apply(null, getArgumentNames(factory).map(get));
    }
};
global.React = require('react');
require(__dirname + '/app/js/cfg');
require(__dirname + '/app/js/CommentListComponent');
require(__dirname + '/app/js/CommentsComponent');
require(__dirname + '/app/js/guid');
require(__dirname + '/app/js/EventEmitter');
require(__dirname + '/app/js/dispatcher');
require(__dirname + '/app/js/actionTypes');
require(__dirname + '/app/js/actionCreators');
require('./js/commentStore');

var app = express();
app.use(function(req, res, next) {
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
});
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cookieParser());
app.get('/comments', function (req, res) {
    res.send(get('commentStore').getComments());
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
        res.redirect(303, get('cfg').base.path + '/');
    } else {
        res.send(201);
    }
});
app.get('/', function(req, res) {
    if(req.cookies.js === 'no') {
        var str = '<!doctype html><html lang="en"><head><title>far</title><meta charset="utf-8"></head><body>';
        str += global.React.renderComponentToStaticMarkup(get('CommentsComponent')({
            comments: get('commentStore').getComments()
        }));
        str += '</body></html>';
        res.send(str);
    } else if(req.cookies.js === 'yes') {
        res.sendFile(__dirname + '/app/index.html');
    } else {
        if(req.headers.referer === get('cfg').base.url + get('cfg').base.path + '/') {
            res.send('no cookies');
        } else {
            res.cookie('js', 'no');
            res.sendFile(__dirname + '/app/index.html');
        }
    }
});
app.use(express.static('app'));

var rootApp = express();
rootApp.use(get('cfg').base.path, app);
rootApp.listen(get('cfg').listen.port, get('cfg').listen.hostname);

console.log('Your app is now available on ' + get('cfg').base.url + get('cfg').base.path + '/ (as specified in ./app/js/cfg.js)');
