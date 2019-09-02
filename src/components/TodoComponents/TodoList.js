// your components will all go in this `component` directory.
// feel free to change this component.js into TodoList.js
import React, { Component } from "react";
import Todo from "./Todo";
import TodoForm from "./TodoForm";

import './TodoList.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
    this.create = this.create.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.toggleCompleted = this.toggleCompleted.bind(this);
  };

  getDataFromLocalStorage() {
    // for all items in state
    for (let key in this.state) {
      // if the key exists in localStorage
      if (localStorage.hasOwnProperty(key)) {
        // get the key's value from localStorage
        let value = localStorage.getItem(key);
        // parse the localStorage string and setState
        try {
          value = JSON.parse(value);
          this.setState({ todos: value });
        } catch (e) {
          // handle empty string
          this.setState({ todos: value });
        }
      }
    }
  }

  componentDidMount() {
    this.getDataFromLocalStorage();
 }

  // Adding new todos to UI and local storage
  create(newTodo, parentId = null) {
    if (newTodo.task.trim() === '') {
      alert('Enter something');
    } else {
      this.setState({
        todos: [...this.state.todos, newTodo]
      });
      var todos = [...this.state.todos, newTodo];
      // Update local storage
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }

  // Deleting todos UI and local storage
  remove(id) {
    var todos = [...this.state.todos];
    const deletedTodos = todos.filter(todo => todo.id !== id);
    this.setState({
      todos: deletedTodos
    });
    // Remove from local storage
    localStorage.setItem('todos', JSON.stringify(deletedTodos))
  }

  // editing todos and updating UI and local storage
  update(id, updatedTask) {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return {...todo, task: updatedTask}
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
    // Edit in local storage
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
  }

  toggleCompleted(id) {
    const updatedTodos = this.state.todos.map(todo => {
      if (todo.id === id) {
        return {...todo, completed: !todo.completed }
      }
      return todo;
    });
    this.setState({ todos: updatedTodos });
    localStorage.setItem('todos', JSON.stringify(updatedTodos))
  }

  render() {
    const todos = this.state.todos.map(todo => {
    return ( 
      <Todo 
        key={todo.id}
        id={todo.id}
        task={todo.task}
        completed={todo.completed}
        removeTodo={this.remove}
        updateTodo={this.update}
        toggleTodo={this.toggleCompleted}
      />
    );
    })
    return (
      <div className="TodoList">
        <h1>Todo List! <span>Welcome to your Todo App!</span></h1>
        <TodoForm createTodo={this.create} />        
        <ul>{todos}</ul>
      </div>
    )
  }
}

export default TodoList;
