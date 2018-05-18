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

    onDragStart = id => e => {
        // e.dataTransfer.setData('text/html', this.dragged);

        this.setState({
            draggedId: id
        })
    }

    onDrop = id => e => {
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

    render() {
        const { tasks } = this.state;
        const displayTasks = tasks.map((item,i) => {
            return (
                <Task key={i}
                    item={item} 
                    onDragStart={this.onDragStart}
                    onDrop={this.onDrop} />
            );
        })

        return (
            <div className='board'>
                {displayTasks} 
            </div>
        );
    }
}

export default Board;