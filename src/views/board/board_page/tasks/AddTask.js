/* eslint-disable react/destructuring-assignment */
import PropTypes from "prop-types";
import React, { Component } from "react";

export class AddTask extends Component {
  // eslint-disable-next-line react/state-in-constructor
  state = {
    title: ""
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.addTask(this.state.title, this.props.laneId, this.props.cardId);
    this.setState({ title: "" });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <form onSubmit={this.onSubmit} style={{ display: "flex" }}>
        <input
          type="text"
          name="title"
          style={{ flex: "10", padding: "5px" }}
          placeholder="Add Task ..."
          value={this.state.title}
          onChange={this.onChange}
        />
        <input
          type="submit"
          value="Submit"
          className="btn"
          style={{ flex: "1" }}
        />
      </form>
    );
  }
}

// PropTypes
AddTask.propTypes = {
  addTask: PropTypes.func.isRequired
};

export default AddTask;
