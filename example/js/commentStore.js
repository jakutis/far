global.app.factory('commentStore', function(guid, EventEmitter, dispatcher, actionTypes) {
    var comments = [
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
    dispatcher.addListener(function(action) {
        if(action.actionType === actionTypes.ADD_COMMENT) {
            if(comments.every(function(c) {
                return c.guid !== action.item.guid;
            })) {
                comments.push(action.item);
            }
        }
    });
    return {
        getComments: function() {
            return comments.slice();
        }
    };
});
