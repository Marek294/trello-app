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

        const { item, handleIsEditing } = this.props
        handleIsEditing(true);

        this.setState({
            isEditing: true,
            value: item.text
        })
    }

    handleButtonClick = () => {
        const { handleTaskTextChange, item, handleIsEditing } = this.props;
        const { value } = this.state;

        const newItem = {
            ...item,
            text: value
        }

        handleTaskTextChange(newItem);
        handleIsEditing(false);

        this.setState({
            isEditing: false,
            value: ''
        })
    }

    handleBackdropClick = () => {
        const { handleIsEditing } = this.props;
        handleIsEditing(false);

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
        const { id, text } = item;

        return (
            isEditing ?
                <div className='modal'>
                    <div className='backdrop' onClick={this.handleBackdropClick} />
                    <div className='task task--edit'>
                        <input className='task__input' type='text' name='value' onChange={this.handleOnChange} value={value} />
                        <button className='task__button' onClick={this.handleButtonClick} >Ok</button>
                    </div>
                </div>
                :
                <a id='task'
                    href=""
                    className='task'
                    draggable
                    onDragStart={handleOnTaskDragStart(item)}
                    onDragOver={handleOnDragOver}
                    onDrop={handleOnTaskDrop(id)}
                    onClick={this.showModal} >
                    {text}
                </a>
        );
    }
}

export default Task;