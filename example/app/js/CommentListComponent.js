app.value('CommentListComponent', React.createClass({
    propTypes: {
        comments: React.PropTypes.array
    },
    render: function() {
        return React.DOM.div(null, this.props.comments.map(function(comment) {
            return React.DOM.div(null, comment.content);
        }));
    }
}));
