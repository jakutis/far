var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var cfg = {
    statics: __dirname + '/app',
    referer: 'http://localhost:3000/'
};

var get = require('./js/globalApp')(cfg);

var app = express();
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
        res.redirect(303, '/');
    } else {
        res.send(201);
    }
});
app.get('/', function(req, res) {
    if(req.cookies.js === 'no') {
        var str = '<!doctype html><html lang="en"><head><title>ngreact</title><meta charset="utf-8"></head><body>';
        str += global.React.renderComponentToStaticMarkup(get('CommentsComponent')({
            comments: get('commentStore').getComments()
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
