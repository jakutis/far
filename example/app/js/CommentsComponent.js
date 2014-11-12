app.factory('CommentsComponent', function(CommentListComponent) {
    return React.createClass({
        getInitialState: function() {
            return {
                value: ''
            };
        },
        propTypes: {
            comments: React.PropTypes.array,
            addNew: React.PropTypes.func
        },
        render: function() {
            return React.DOM.form({
                action: '/comments',
                method: 'POST',
                onSubmit: function(event) {
                    event.preventDefault();
                }
            }, [
                CommentListComponent({
                    comments: this.props.comments
                }),
                React.DOM.textarea({
                    value: this.state.value,
                    name: 'content',
                    onChange: function(event) {
                        this.setState({
                            value: event.target.value
                        });
                    }.bind(this)
                }),
                React.DOM.input({
                    type: 'submit',
                    value: 'Add',
                    onClick: function() {
                        this.props.addNew(this.state.value);
                        this.setState(this.getInitialState());
                    }.bind(this)
                })
            ]);
        }
    });
});
