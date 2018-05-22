import React, { Component } from 'react';
import Task from '../Task/Task';
import './Board.css';

class Board extends Component {
    onDragOverBoard = e => e.preventDefault();

    render() {
        const { handleOnBoardDrop, tasks, handleOnTaskDragStart, handleOnTaskDrop, id, handleOnBoardDragStart } = this.props;

        const displayTasks = tasks.map((item,i) => {
            return (
                <Task key={i}
                    boardId={id}
                    item={item} 
                    handleOnTaskDragStart={handleOnTaskDragStart}
                    handleOnTaskDrop={handleOnTaskDrop} />
            );
        })

        return (
            <div id='board' className='board' draggable onDragOver={this.onDragOverBoard} onDrop={handleOnBoardDrop} onDragStart={handleOnBoardDragStart} >
                {displayTasks} 
            </div>
        );
    }
}

export default Board;