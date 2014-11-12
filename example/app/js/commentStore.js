app.factory('commentStore', function(remoteComments, dispatcher, actionTypes, EventEmitter) {
    function CommentStore() {
        EventEmitter.call(this);
        this.comments = [];
    }
    CommentStore.prototype = _.create(EventEmitter.prototype, {
        'constructor': CommentStore
    });
    _.assign(CommentStore.prototype, {
        comments: null,
        addComment: function(comment) {
            this.comments.push(comment);
        },
        emitChange: function() {
            this.emit('change');
        }
    });

    var commentStore = new CommentStore();
    var knownComments = [];

    remoteComments.getList().then(function(comments) {
        var changed = false;
        comments.forEach(function(comment) {
            addComment(comment, function() {
                changed = true;
            });
        });
        if(changed) {
            commentStore.emitChange();
        }
    });

    var addComment = function(comment, onAdd) {
        if(knownComments.indexOf(comment.guid) < 0) {
            knownComments.push(comment.guid);
            commentStore.addComment(comment);
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
            commentStore.emitChange();
        }
    });

    return {
        addListener: function(l) {
            commentStore.addListener(l);
        },
        getComments: function() {
            return commentStore.comments.slice();
        }
    };
});


