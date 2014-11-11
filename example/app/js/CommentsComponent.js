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
            console.log('render', this.state.value);
            return React.DOM.div(null, [
                CommentListComponent({
                    comments: this.props.comments
                }),
                React.DOM.textarea({
                    value: this.state.value,
                    onChange: function(event) {
                        console.log('onchange', event.target.value);
                        this.setState({
                            value: event.target.value
                        });
                    }.bind(this)
                }),
                React.DOM.button({
                    onClick: function() {
                        console.log('onclick', this.state.value, this.props);
                        this.props.addNew(this.state.value);
                        this.setState(this.getInitialState());
                    }.bind(this)
                }, 'Add')
            ]);
        }
    });
});
