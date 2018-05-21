import React, { Component } from 'react';
import Board from '../Board/Board';
import './Boards.css';

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
        draggedItem: null
    }

    handleOnTaskDragStart = item => e => {
        this.setState({
            draggedItem: item
        })
    }

    getSlicedTasksArray = (tasks, draggedItem) => {
        const draggedIndex = tasks.findIndex(item => item.id === draggedItem.id)

        return {
            element: tasks[draggedIndex],
            newTasks: [
                ...tasks.slice(0, draggedIndex),
                ...tasks.slice(draggedIndex + 1)
            ]
        }

    }

    handleOnTaskDrop = boardId => id => e => {
        e.preventDefault();
        const { tasks, draggedItem } = this.state
        let { newTasks, element } = this.getSlicedTasksArray(tasks, draggedItem)

        element.board = boardId
        const dropedIndex = newTasks.findIndex(item => item.id === id)
        newTasks.splice(dropedIndex, 0, element)

        this.setState({
            tasks: newTasks
        })

    }

    onBoardDrop = id => e => {
        e.preventDefault();
        const { tasks, draggedItem } = this.state;

        if (draggedItem.board !== id && e.target.className.includes('board')) {
            let { newTasks, element } = this.getSlicedTasksArray(tasks, draggedItem)

            element.board = id
            newTasks.push(element)

            this.setState({
                tasks: newTasks
            })
        }
    }

    boardTasks = boardId => {
        const { tasks } = this.state;

        return tasks.filter(item => item.board === boardId);
    }

    render() {
        return (
            <div className='boards'>
                <h1 className='boards__title'>Trello App</h1>
                <div className='boards__container' >
                    {[1, 2, 3].map(id =>
                        <Board key={id}
                            handleOnTaskDragStart={this.handleOnTaskDragStart}
                            handleOnTaskDrop={this.handleOnTaskDrop(id)}
                            onBoardDrop={this.onBoardDrop(id)}
                            tasks={this.boardTasks(id)} />)}
                </div>
            </div>
        );
    }
}

export default Boards;