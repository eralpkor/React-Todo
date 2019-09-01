// your components will all go in this `component` directory.
// feel free to change this component.js into TodoList.js
import React, { Component } from "react";
import Todo from "./Todo";

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [{ task: "Walk the fish" }, { task: "Feed the chicken" }]
    };
  }

  render() {
    const todos = this.state.todos.map(todo => {
      return <Todo task={todo.task} />;
    });

    return (
      <div>
        <ul>{todos}</ul>
      </div>
    );
  }
}

export default TodoList;
