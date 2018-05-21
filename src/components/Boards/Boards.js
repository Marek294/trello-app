import React, { Component } from 'react';
import Board from '../Board/Board';

class Boards extends Component {
    state = {
        tasks: [
            {
                id: 1,
                board: 1,
                text: 'Pierwsze zadanie'
            },
            {
                id: 2,
                board: 1,
                text: 'Drugie zadanie'
            },
            {
                id: 3,
                board: 1,
                text: 'Trzecie zadanie'
            },
            {
                id: 4,
                board: 2,
                text: 'Czwarte zadanie'
            }
        ],
        draggedId: null
    }

    handleOnTaskDragStart = id => e => {
        this.setState({
            draggedId: id
        })
    }

    handleOnTaskDrop = id => e => {
        console.log('task drop', id);
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

    onBoardDrop = id => e => {
        e.preventDefault();
        console.log('board drop', id)
    }

    filterTasks = boardId => {
        const { tasks } = this.state;

        return tasks.filter(item => item.board === boardId);
    }

    render() {
        return (
            <div className='boards'>
                <h1 className='boards__title'>Trello App</h1>
                {[1, 2].map(id =>
                    <Board id={id}
                        handleOnTaskDragStart={this.handleOnTaskDragStart}
                        handleOnTaskDrop={this.handleOnTaskDrop}
                        onBoardDrop={this.onBoardDrop(id)}
                        tasks={this.filterTasks(id)} />)}
            </div>
        );
    }
}

export default Boards;