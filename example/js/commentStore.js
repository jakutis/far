var _ = require('lodash');
global.app.factory('commentStore', function(guid, EventEmitter, dispatcher, actionTypes) {
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

    var commentStore = new CommentStore();
    dispatcher.addListener(function(action) {
        if(action.actionType === actionTypes.ADD_COMMENT) {
            commentStore.addComment(action.item);
        }
        commentStore.emitChange();
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


