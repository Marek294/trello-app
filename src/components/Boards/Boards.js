import React, { Component } from "react";
import { connect } from "react-redux";
import Board from "../Board/Board";
import { changeTaskPosition, changeTaskBoard } from "../../actions/tasks";
import { changeBoardPosition } from "../../actions/boards";
import "./Boards.css";

class Boards extends Component {
  state = {
    draggedItem: null,
    isTaskDragged: false,
    isBoardDragged: false
  };

  boardTasks = boardId => {
    const { tasks } = this.props;

    return tasks.filter(item => item.board === boardId);
  };

  handleOnTaskDragStart = item => e => {
    e.stopPropagation();

    this.setState({
      draggedItem: item,
      isTaskDragged: true,
      isBoardDragged: false
    });
  };

  handleOnBoardDragStart = item => e => {
    e.stopPropagation();
    e.dataTransfer.setData("item", item);

    this.setState({
      draggedItem: item,
      isTaskDragged: false,
      isBoardDragged: true
    });
  };

  handleOnTaskDrop = boardId => taskId => e => {
    e.preventDefault();
    if (e.stopPropagation) e.stopPropagation();

    const { draggedItem, isTaskDragged, isBoardDragged } = this.state;

    if (isTaskDragged && draggedItem.id !== taskId)
      return this.props.changeTaskPosition(draggedItem, taskId, boardId);
    if (isBoardDragged) return this.handleOnBoardDrop(boardId)(e);
  };

  handleOnBoardDrop = boardId => e => {
    e.preventDefault();
    e.stopPropagation();

    const { draggedItem, isTaskDragged, isBoardDragged } = this.state;

    if (isTaskDragged && draggedItem.board !== boardId)
      this.props.changeTaskBoard(draggedItem, boardId);

    if (isBoardDragged && draggedItem.id !== boardId)
      return this.props.changeBoardPosition(draggedItem, boardId);
  };

  render() {
    const { boards } = this.props;
    return (
      <div className="boards">
        <h1 className="boards__title">Trello App</h1>
        <div className="boards__container">
          {boards.map(board => (
            <Board
              key={board.id}
              board={board}
              handleOnTaskDragStart={this.handleOnTaskDragStart}
              handleOnTaskDrop={this.handleOnTaskDrop(board.id)}
              handleOnBoardDragStart={this.handleOnBoardDragStart(board)}
              handleOnBoardDrop={this.handleOnBoardDrop(board.id)}
              tasks={this.boardTasks(board.id)}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tasks: state.tasks,
    boards: state.boards
  };
};

const mapDispatchToProps = dispatch => ({
  changeTaskPosition: (draggedItem, dropedTaskId, boardId) =>
    dispatch(changeTaskPosition(draggedItem, dropedTaskId, boardId)),
  changeTaskBoard: (draggedItem, boardId) =>
    dispatch(changeTaskBoard(draggedItem, boardId)),
  changeBoardPosition: (draggedItem, dropedBoardId) =>
    dispatch(changeBoardPosition(draggedItem, dropedBoardId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Boards);
