app.factory('actionCreators', function(dispatcher, actionTypes) {
    return {
        addComment: function(item) {
            dispatcher.emit({
                actionType: actionTypes.ADD_COMMENT,
                item: item
            });
        }
    };
});
