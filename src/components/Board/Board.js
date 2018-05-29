import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeBoardTitle } from '../../actions/boards';
import Task from '../Task/Task';
import './Board.css';

class Board extends Component {
    state = {
        isDraggable: true,
        isBoardEditing: false,
        value: ''
    }

    boardIsDraggable = value => this.setState({
        isDraggable: value
    })

    handleOnBoardTitleClick = title => () => this.setState({
        isDraggable: false,
        isBoardEditing: true,
        value: title
    })

    handleOnChange = e => this.setState({
        [e.target.name]: e.target.value
    })

    handleBackdropClick = () => this.setState({
        isDraggable: true,
        isBoardEditing: false,
        value: ''
    })

    handleButtonClick = () => {
        const { item } = this.props;
        const { value } = this.state;

        const newItem = {
            ...item,
            title: value
        }

        this.props.changeBoardTitle(newItem);

        this.setState({
            isDraggable: true,
            isBoardEditing: false,
            value: ''
        })
    }

    onDragOverBoard = e => e.preventDefault();

    render() {
        const { isDraggable, isBoardEditing, value } = this.state;
        const { handleOnBoardDrop, tasks, handleOnTaskDragStart, handleOnTaskDrop, handleOnBoardDragStart, handleTitleChange, board: { title } } = this.props;

        const displayTasks = tasks.map((task, i) => {
            return (
                <Task key={i}
                    task={task}
                    handleOnTaskDragStart={handleOnTaskDragStart}
                    handleOnTaskDrop={handleOnTaskDrop}
                    handleTitleChange={handleTitleChange}
                    boardIsDraggable={this.boardIsDraggable} />
            );
        })

        return (
            <div className='board' draggable={isDraggable} onDragOver={this.onDragOverBoard} onDrop={handleOnBoardDrop} onDragStart={handleOnBoardDragStart} >
                {isBoardEditing ?
                    <React.Fragment>
                        <div className='backdrop' onClick={this.handleBackdropClick} />
                        <div className='board--edit'>
                            <input className='board__input' type='text' name='value' onChange={this.handleOnChange} value={value} />
                            <button className='board__button' onClick={this.handleButtonClick} >Ok</button>
                        </div>
                    </React.Fragment>
                    :
                    <h3 className='board__title' onClick={this.handleOnBoardTitleClick(title)} >{title}</h3>}
                {displayTasks}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    changeBoardTitle: newItem => dispatch(changeBoardTitle(newItem))
})

export default connect(null, mapDispatchToProps)(Board);