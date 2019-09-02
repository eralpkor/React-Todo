import React, { Component } from 'react';

class TodoForm extends Component {
  constructor(props) {
    super(props);
      this.state = {task: ''};
      this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  render() {
    return (
      <form>
        <label htmlFor='task'>New Todo</label>
        <input
        type='text' 
        placeholder='New Todo' 
        id='task'
        name='task'
        value={this.state.task}
        onChange={this.handleChange}
        />
      </form>
    );
  }
}

export default TodoForm;