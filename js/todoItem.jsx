var app = app || {};

(function () {
    'use strict';

    var ESCAPE_KEY = 27;
    var ENTER_KEY = 13;

    app.TodoItem = React.createClass({
        handleSubmit: function (event) {
            var val = this.state.editText.trim();
            if (val) {
                this.props.onSave(val);
                this.setState({ editText: val });
            } else {
                this.props.onDestory();
            }
        },
        handleEdit: function () {
            this.props.onEdit();
            this.setState({ editText: this.props.todo.title });
        },
        handleKeyDown: function (event) {
            if (event.which === ESCAPE_KEY) {
                this.setState({ editText: this.props.todo.title });
                this.props.onCancel(event);
            } else if (event.which === ENTER_KEY) {
                this.handleSubmit(event);
            }
        },
        handleChange: function (event) {
            if (event.props.editing) {
                this.setState({ editText: event.target.value });
            }
        },
        getInitialState: function () {
            return { editText: this.props.todo.title };
        },
        shouldComponentUpdate: function (nextProps, nextState) {
            return (nextProps.todo !== this.props.todo ||
                nextProps.editing !== this.props.editing ||
                nextState.editText !== this.state.editText);
        }
    });
})();