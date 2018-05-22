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
        boards: [
            {
                id: 1
            },
            {
                id: 2
            },
            {
                id: 3
            }
        ],
        draggedItem: null,
        isTaskDragged: false,
        isBoardDragged: false
    }

    handleOnTaskDragStart = item => e => {
        this.setState({
            draggedItem: item,
            isTaskDragged: true,
            isBoardDragged: false
        })
    }

    handleOnBoardDragStart = item => e => {
        if(e.target.id === 'board') {
            e.dataTransfer.setData('item', item)
            this.setState({
                draggedItem: item,
                isBoardDragged: true,
                isTaskDragged: false
            })
        }
    }

    getSlicedArray = (array, draggedItem, dropedId) => {
        const draggedIndex = array.findIndex(item => item.id === draggedItem.id)
        const dropedIndex = array.findIndex(item => item.id === dropedId)

        return {
            element: array[draggedIndex],
            newArray: [
                ...array.slice(0, draggedIndex),
                ...array.slice(draggedIndex + 1)
            ],
            position: draggedIndex > dropedIndex ? 0 : 1
        }

    }

    handleOnTaskDrop = boardId => id => e => {
        e.preventDefault();
        const { tasks, boards, draggedItem, isTaskDragged, isBoardDragged } = this.state

        if(isTaskDragged) {
            let { newArray, element, position } = this.getSlicedArray(tasks, draggedItem, id)

            element.board = boardId
            const dropedIndex = newArray.findIndex(item => item.id === id)
            newArray.splice(dropedIndex + position, 0, element)

            this.setState({
                tasks: newArray
            })

            return;
        }

        if(isBoardDragged) this.handleOnBoardDrop(boardId)

    }

    handleOnBoardDrop = id => e => {
        e.preventDefault();
        const { tasks, boards, draggedItem, isTaskDragged, isBoardDragged } = this.state;

        if(isTaskDragged) {
            if (draggedItem.board !== id && e.target.id === 'board') {
                let { newArray, element } = this.getSlicedArray(tasks, draggedItem)

                element.board = id
                newArray.push(element)

                this.setState({
                    tasks: newArray
                })
            }
        }

        if(isBoardDragged) {
            let { newArray, element, position } = this.getSlicedArray(boards, draggedItem, id)

            const dropedIndex = newArray.findIndex(item => item.id === id)
            newArray.splice(dropedIndex + position, 0, element)

            this.setState({
                boards: newArray
            })
        }
    }

    boardTasks = boardId => {
        const { tasks } = this.state;

        return tasks.filter(item => item.board === boardId);
    }

    render() {
        const { boards } = this.state;
        return (
            <div className='boards'>
                <h1 className='boards__title'>Trello App</h1>
                <div className='boards__container' >
                    {boards.map(item =>
                        <Board key={item.id}
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

export default Boards;