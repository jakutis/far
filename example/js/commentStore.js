global.app.factory('commentStore', function(guid, EventEmitter, dispatcher, actionTypes) {
    var sqlite3 = require('sqlite3').verbose();
    var db = new sqlite3.Database(':memory:');

    db.run("CREATE TABLE comments (guid TEXT, content TEXT)");

    var guids = [];
    dispatcher.addListener(function(action) {
        if(action.actionType === actionTypes.ADD_COMMENT) {
            if(guids.indexOf(action.item.guid) < 0) {
                guids.push(action.item.guid);
                var stmt = db.prepare("INSERT INTO comments VALUES (?, ?)");
                stmt.run(action.item.guid, action.item.content);
                stmt.finalize();
            }
        }
    });
    return {
        getComments: function(cb) {
            var comments = [];
            db.each("SELECT content, guid FROM comments", function(err, row) {
                if(err) {
                    return;
                }
                comments.push({
                    guid: row.guid,
                    content: row.content
                });
            }, function(err) {
                if(err) {
                    return cb(err);
                }
                cb(null, comments);
            });
        }
    };
});
