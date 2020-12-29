/* eslint-disable no-use-before-define */
/* eslint-disable react/button-has-type */
/* eslint-disable react/destructuring-assignment */
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "components/CustomButtons/Button";
import PropTypes from "prop-types";
import React, { Component } from "react";

export class TaskItem extends Component {
  getStyle = () => {
    return {
      background: "#f4f4f4",
      padding: "10px",
      borderBottom: "1px #ccc dotted",
      textDecoration: this.props.task.complete ? "line-through" : "none",
    };
  };

  render() {
    const { modalCard } = this.props;
    const { id, title } = this.props.task;
    return (
      <div style={this.getStyle()}>
        <p>
          <input
            type="checkbox"
            onChange={this.props.markComplete.bind(this, id, modalCard)}
          />{" "}
          {title}
          <Button
            onClick={this.props.delTask.bind(this, id, modalCard)}
            color="primary"
            floatRight
            block
          >
            Remove Task
            <DeleteIcon />
          </Button>
        </p>
      </div>
    );
  }
}

// PropTypes
TaskItem.propTypes = {
  task: PropTypes.object.isRequired,
  markComplete: PropTypes.func.isRequired,
  delTask: PropTypes.func.isRequired,
  modalCard: PropTypes.object.isRequired,
};

const btnStyle = {
  background: "#ff0000",
  color: "#fff",
  border: "none",
  padding: "5px 9px",
  borderRadius: "50%",
  cursor: "pointer",
  float: "right",
};

export default TaskItem;
