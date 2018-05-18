import React, { Component } from 'react';
import Task from '../Task/Task';
import './Board.css';

class Board extends Component {
    state = {
        tasks: [
            {
                id: 1,
                text: 'Pierwsze zadanie'
            },
            {
                id: 2,
                text: 'Drugie zadanie'
            },
            {
                id: 3,
                text: 'Trzecie zadanie'
            }
        ],
        draggedId: null
    }

    handleOnTaskDragStart = id => e => {
        // e.dataTransfer.setData('text/html', this.dragged);

        this.setState({
            draggedId: id
        })
    }

    handleOnTaskDrop = id => e => {
        e.preventDefault();
        const { tasks, draggedId } = this.state

        const draggedIndex = tasks.findIndex(item => item.id === draggedId)
        const dropedIndex = tasks.findIndex(item => item.id === id)
        const element = tasks[draggedIndex]

        let newTasks = [
        ...tasks.slice(0, draggedIndex),
        ...tasks.slice(draggedIndex + 1)
        ]

        newTasks.splice(dropedIndex, 0, element)

        this.setState({
            tasks: newTasks
        })

    }

    // onDragOverBoard = e => e.preventDefault();

    render() {
        // const { onBoardDrop, id } = this.props;
        const { tasks } = this.state;
        const displayTasks = tasks.map((item,i) => {
            return (
                <Task key={i}
                    item={item} 
                    handleOnTaskDragStart={this.handleOnTaskDragStart}
                    handleOnTaskDrop={this.handleOnTaskDrop} />
            );
        })

        return (
            <div className='board' >
                {displayTasks} 
            </div>
        );
    }
}

export default Board;