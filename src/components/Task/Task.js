import React, { Component } from 'react';
import './Task.css';

const handleOnDragOver = e => e.preventDefault();

class Task extends Component {
    state = {
        isEditing: false,
        value: ''
    }

    showModal = e => {
        e.preventDefault();

        const { item, boardIsDraggable } = this.props
        boardIsDraggable(false);

        this.setState({
            isEditing: true,
            value: item.title
        })
    }

    handleButtonClick = () => {
        const { handleTitleChange, item, boardIsDraggable } = this.props;
        const { value } = this.state;

        const newItem = {
            ...item,
            title: value
        }

        handleTitleChange(newItem, 'tasks');
        boardIsDraggable(true);

        this.setState({
            isEditing: false,
            value: ''
        })
    }

    handleBackdropClick = () => {
        const { boardIsDraggable } = this.props;
        boardIsDraggable(true);

        this.setState({
            isEditing: false,
            value: ''
        })
    }

    handleOnChange = e => this.setState({
        [e.target.name]: e.target.value
    })

    render() {
        const { isEditing, value } = this.state;
        const { item, handleOnTaskDragStart, handleOnTaskDrop } = this.props;
        const { id, title } = item;

        return (
            isEditing ?
                <React.Fragment>
                    <div className='backdrop' onClick={this.handleBackdropClick} />
                    <div className='task task--edit'>
                        <input className='task__input' type='text' name='value' onChange={this.handleOnChange} value={value} />
                        <button className='task__button' onClick={this.handleButtonClick} >Ok</button>
                    </div>
                </React.Fragment>
                :
                <a id='task'
                    href=""
                    className='task'
                    draggable
                    onDragStart={handleOnTaskDragStart(item)}
                    onDragOver={handleOnDragOver}
                    onDrop={handleOnTaskDrop(id)}
                    onClick={this.showModal} >
                    {title}
                </a>
        );
    }
}

export default Task;