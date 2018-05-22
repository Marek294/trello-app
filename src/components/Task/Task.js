import React from 'react';
import './Task.css';

const handleOnDragOver = e => e.preventDefault();

const Task = (props) => {
    const { item, handleOnTaskDragStart, handleOnTaskDrop } = props;
    const { id, text } = item;

    return (
        <a id='task' href="" className='task' draggable onDragStart={handleOnTaskDragStart(item)} onDragOver={handleOnDragOver} onDrop={handleOnTaskDrop(id)}>
            {text}
        </a>
    );
};

export default Task;