import React, { Component } from 'react';
import Task from '../Task/Task';
import './Board.css';

class Board extends Component {
    state = {
        isEditing: false,
    }

    handleIsEditing = value => this.setState({
        isEditing: value
    })

    onDragOverBoard = e => e.preventDefault();

    render() {
        const { isEditing } = this.state;
        const { handleOnBoardDrop, tasks, handleOnTaskDragStart, handleOnTaskDrop, id, handleOnBoardDragStart, handleTaskTextChange } = this.props;

        const displayTasks = tasks.map((item,i) => {
            return (
                <Task key={i}
                    boardId={id}
                    item={item} 
                    handleOnTaskDragStart={handleOnTaskDragStart}
                    handleOnTaskDrop={handleOnTaskDrop}
                    handleTaskTextChange={handleTaskTextChange}
                    handleIsEditing={this.handleIsEditing} />
            );
        })

        return (
            <div id='board' className='board' draggable={!isEditing} onDragOver={this.onDragOverBoard} onDrop={handleOnBoardDrop} onDragStart={handleOnBoardDragStart} >
                {displayTasks} 
            </div>
        );
    }
}

export default Board;