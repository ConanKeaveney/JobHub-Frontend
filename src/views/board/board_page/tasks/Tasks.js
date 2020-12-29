/* eslint-disable import/no-named-as-default */
/* eslint-disable react/destructuring-assignment */
import PropTypes from "prop-types";
import React, { Component } from "react";
import TaskItem from "./TaskItem";

class Tasks extends Component {
  render() {
    return this.props.tasks.map(task => (
      <TaskItem
        key={task.id}
        task={task}
        markComplete={this.props.markComplete}
        delTask={this.props.delTask}
        modalCard={this.props.modalCard}
      />
    ));
  }
}

Tasks.propTypes = {
  tasks: PropTypes.array.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTask: PropTypes.func.isRequired,
  modalCard: PropTypes.object.isRequired
};

export default Tasks;
