var getArgumentNames = require('get-parameter-names');

module.exports = function(cfg) {
    var get = function(name) {
        return global.app._container[name];
    };
    global.app = {
        _container: {},
        value: function(name, value) {
            this._container[name] = value;
        },
        factory: function(name, factory) {
            this._container[name] = factory.apply(null, getArgumentNames(factory).map(get));
        }
    };
    global.React = require('react');
    require(cfg.statics + '/js/CommentListComponent');
    require(cfg.statics + '/js/CommentsComponent');
    require(cfg.statics + '/js/guid');
    require(cfg.statics + '/js/EventEmitter');
    require(cfg.statics + '/js/dispatcher');
    require(cfg.statics + '/js/actionTypes');
    require(cfg.statics + '/js/actionCreators');
    require('./commentStore');
    return get;
};
