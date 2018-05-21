import React, { Component } from 'react';
import Task from '../Task/Task';
import './Board.css';

class Board extends Component {
    onDragOverBoard = e => e.preventDefault();

    render() {
        const { onBoardDrop, tasks, handleOnTaskDragStart, handleOnTaskDrop, id } = this.props;

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
            <div className='board' onDragOver={this.onDragOverBoard} onDrop={onBoardDrop} >
                {displayTasks} 
            </div>
        );
    }
}

export default Board;