import React, { Component } from 'react';
import { connect } from 'react-redux';
import Board from '../Board/Board';
import { changeTaskPosition, changeTaskBoard } from '../../actions/tasks';
import './Boards.css';

class Boards extends Component {
    state = {
        boards: [
            {
                id: 1,
                title: 'Pierwsza tablica'
            },
            {
                id: 2,
                title: 'Druga tablica'
            },
            {
                id: 3,
                title: 'Trzecia tablica'
            }
        ],
        draggedItem: null,
        isTaskDragged: false,
        isBoardDragged: false,
    }

    boardTasks = boardId => {
        const { tasks } = this.props;

        return tasks.filter(item => item.board === boardId);
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

    handleOnTaskDragStart = item => e => {
        this.setState({
            draggedItem: item,
            isTaskDragged: true,
            isBoardDragged: false
        })
    }

    handleOnBoardDragStart = item => e => {
        if (e.target.id === 'board') {
            e.dataTransfer.setData('item', item)
            this.setState({
                draggedItem: item,
                isBoardDragged: true,
                isTaskDragged: false
            })
        }
    }

    handleOnTaskDrop = boardId => id => e => {
        e.preventDefault();
        const { draggedItem, isTaskDragged, isBoardDragged } = this.state

        if (isTaskDragged && draggedItem.id !== id) return this.props.changeTaskPosition(draggedItem, id, boardId);
        if (isBoardDragged) return this.handleOnBoardDrop(boardId)

    }

    handleOnBoardDrop = id => e => {
        e.preventDefault();
        const { boards, draggedItem, isTaskDragged, isBoardDragged } = this.state;

        if (isTaskDragged) {
            if (draggedItem.board !== id && e.target.id === 'board') this.props.changeTaskBoard(draggedItem, id);
            return
        }

        if (isBoardDragged && draggedItem.id !== id) {
            let { newArray, element, position } = this.getSlicedArray(boards, draggedItem, id)

            const dropedIndex = newArray.findIndex(item => item.id === id)
            newArray.splice(dropedIndex + position, 0, element)

            this.setState({
                boards: newArray
            })
        }
    }

    handleTitleChange = (newItem, arrayNameString) => {
        const array = this.state[arrayNameString];

        const itemIndex = array.findIndex(item => item.id === newItem.id)
        array.splice(itemIndex, 1, newItem);

        this.setState({
            [arrayNameString]: array
        })
    }

    render() {
        const { boards } = this.state;
        return (
            <div className='boards'>
                <h1 className='boards__title'>Trello App</h1>
                <div className='boards__container' >
                    {boards.map(item =>
                        <Board key={item.id}
                            item={item}
                            handleOnTaskDragStart={this.handleOnTaskDragStart}
                            handleOnTaskDrop={this.handleOnTaskDrop(item.id)}
                            handleTitleChange={this.handleTitleChange}
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
        tasks: state.tasks
    }
}

const mapDispatchToProps = dispatch => ({
    changeTaskPosition: (draggedItem, dropedTaskId, boardId) => dispatch(changeTaskPosition(draggedItem, dropedTaskId, boardId)),
    changeTaskBoard: (draggedItem, boardId) => dispatch(changeTaskBoard(draggedItem, boardId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Boards);