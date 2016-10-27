var app = app || {};

(function () {
    'use strict';

    var Utils = app.Utils;
    app.ToDoModel = function (key) {
        this.key = key;
        this.todos = Utils.store(key);
        this.onChanges = [];
    };

    app.ToDoModel.property.subscribe = function (onChange) {
        this.onChanges.push(onChange);
    };

    app.ToDoModel.property.inform = function () {
        Utils.store(this.key, this.todos);
        this.onChanges.forEach(function (cb) { cb(); });
    };

    app.ToDoModel.property.addTodo = function (title) {
        this.todos = this.todos.concat({
            id: Utils.uuid(),
            title: title,
            completed: false
        });
        this.inform();
    };

    app.ToDoModel.property.toggleAll = function (checked) {
        this.todos = this.todos.map(function (todo) {
            return Utils.extend({}, todo, { completed: checked });
        });
        this.inform();
    };

    app.ToDoModel.property.toggle = function (todoToToggle) {
        this.todos = this.todos.map(function (todo) {
            return todo !== todoToToggle ? todo : Utils.extend({}, todo, { completed: !todo.completed });
        });

        this.inform();
    };

    app.ToDoModel.property.destory = function (todo) {
        this.todos = this.todos.filter(function (candidate) {
            return candidate !== todo;
        })
    };

    app.ToDoModel.property.save = function (todoSave, text) {
        this.todos = this.todos.map(function (todo) {
            return todo !== todoSave ? todo : Utils.extend({}, todo, { title: text })
        })
    };

    app.ToDoModel.property.clearCompleted=function(){
        this.todos=this.todos.filter(function(todo){
            return !todo.completed;
        });
        this.inform();
    }
})();