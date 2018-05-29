import React, { Component } from "react";
import { connect } from "react-redux";
import { changeTaskTitle } from "../../actions/tasks";
import "./Task.css";

class Task extends Component {
  state = {
    isEditing: false,
    value: ""
  };

  showModal = e => {
    e.preventDefault();

    const { item, boardIsDraggable } = this.props;
    boardIsDraggable(false);

    this.setState({
      isEditing: true,
      value: item.title
    });
  };

  handleButtonClick = () => {
    const { item, boardIsDraggable } = this.props;
    const { value } = this.state;

    const newItem = {
      ...item,
      title: value
    };

    this.props.changeTaskTitle(newItem);
    boardIsDraggable(true);

    this.setState({
      isEditing: false,
      value: ""
    });
  };

  handleBackdropClick = () => {
    const { boardIsDraggable } = this.props;
    boardIsDraggable(true);

    this.setState({
      isEditing: false,
      value: ""
    });
  };

  handleOnChange = e =>
    this.setState({
      [e.target.name]: e.target.value
    });

  handleOnDragOver = e => e.preventDefault();

  render() {
    const { isEditing, value } = this.state;
    const { task, handleOnTaskDragStart, handleOnTaskDrop } = this.props;
    const { id, title } = task;

    return isEditing ? (
      <React.Fragment>
        <div className="backdrop" onClick={this.handleBackdropClick} />
        <div className="task task--edit">
          <input
            className="task__input"
            type="text"
            name="value"
            onChange={this.handleOnChange}
            value={value}
          />
          <button className="task__button" onClick={this.handleButtonClick}>
            Ok
          </button>
        </div>
      </React.Fragment>
    ) : (
      <a
        id="task"
        href=""
        className="task"
        draggable
        onDragStart={handleOnTaskDragStart(task)}
        onDragOver={this.handleOnDragOver}
        onDrop={handleOnTaskDrop(id)}
        onClick={this.showModal}
      >
        {title}
      </a>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  changeTaskTitle: newItem => dispatch(changeTaskTitle(newItem))
});

export default connect(
  null,
  mapDispatchToProps
)(Task);
