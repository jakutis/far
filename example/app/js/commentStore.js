app.factory('commentStore', function(remoteComments, dispatcher, actionTypes, EventEmitter) {
    var comments = [];
    var emitter = new EventEmitter();

    remoteComments.getList().then(function(comments) {
        var changed = false;
        comments.forEach(function(comment) {
            addComment(comment, function() {
                changed = true;
            });
        });
        if(changed) {
            emitter.emit('change');
        }
    });

    var addComment = function(comment, onAdd) {
        if(comments.every(function(c) {
            return c.guid !== comment.guid;
        })) {
            comments.push(comment);
            onAdd(comment);
        }
    };

    dispatcher.addListener(function(action) {
        var changed = false;
        if(action.actionType === actionTypes.ADD_COMMENT) {
            addComment(action.item, function(comment) {
                changed = true;
                remoteComments.post(comment);
            });
        }
        if(changed) {
            emitter.emit('change');
        }
    });

    return {
        addListener: function(l) {
            emitter.addListener(l);
        },
        getComments: function() {
            return comments.slice();
        }
    };
});


