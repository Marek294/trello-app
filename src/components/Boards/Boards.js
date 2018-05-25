import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from '../Board/Board';
import { changeTaskPosition, changeTaskBoard } from '../../actions/tasks';
import { changeBoardPosition } from '../../actions/boards';
import './Boards.css';

class Boards extends Component {
    state = {
        draggedItem: null,
        isTaskDragged: false,
        isBoardDragged: false,
    }

    boardTasks = boardId => {
        const { tasks } = this.props;

        return tasks.filter(item => item.board === boardId);
    }

    handleOnTaskDragStart = item => e => {
        e.stopPropagation();

        this.setState({
            draggedItem: item,
            isTaskDragged: true,
            isBoardDragged: false
        })
    }

    handleOnBoardDragStart = item => e => {
        e.stopPropagation();
        e.dataTransfer.setData('item', item)

        this.setState({
            draggedItem: item,
            isBoardDragged: true,
            isTaskDragged: false
        })
    }

    handleOnTaskDrop = boardId => id => e => {
        e.preventDefault();
        if(e.stopPropagation) e.stopPropagation();

        const { draggedItem, isTaskDragged, isBoardDragged } = this.state

        if (isTaskDragged && draggedItem.id !== id) return this.props.changeTaskPosition(draggedItem, id, boardId);
        if (isBoardDragged) return this.handleOnBoardDrop(boardId)(e)

    }

    handleOnBoardDrop = id => e => {
        e.preventDefault();
        e.stopPropagation();

        const { draggedItem, isTaskDragged, isBoardDragged } = this.state;

        if (isTaskDragged) {
            if (draggedItem.board !== id) this.props.changeTaskBoard(draggedItem, id);
            return
        }

        if (isBoardDragged && draggedItem.id !== id) return this.props.changeBoardPosition(draggedItem, id);
    }

    render() {
        const { boards } = this.props;
        return (
            <div className='boards'>
                <h1 className='boards__title'>Trello App</h1>
                <div className='boards__container' >
                    {boards.map(item =>
                        <Board key={item.id}
                            item={item}
                            handleOnTaskDragStart={this.handleOnTaskDragStart}
                            handleOnTaskDrop={this.handleOnTaskDrop(item.id)}
                            handleOnBoardDragStart={this.handleOnBoardDragStart(item)}
                            handleOnBoardDrop={this.handleOnBoardDrop(item.id)}
                            tasks={this.boardTasks(item.id)} />)}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        tasks: state.tasks,
        boards: state.boards
    }
}

const mapDispatchToProps = dispatch => ({
    changeTaskPosition: (draggedItem, dropedTaskId, boardId) => dispatch(changeTaskPosition(draggedItem, dropedTaskId, boardId)),
    changeTaskBoard: (draggedItem, boardId) => dispatch(changeTaskBoard(draggedItem, boardId)),
    changeBoardPosition: (draggedItem, dropedBoardId) => dispatch(changeBoardPosition(draggedItem, dropedBoardId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Boards);