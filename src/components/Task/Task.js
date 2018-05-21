import React from 'react';
import './Task.css';

const handleOnDragOver = e => e.preventDefault();

const Task = (props) => {
    const { item, handleOnTaskDragStart, handleOnTaskDrop } = props;
    const { id, text } = item;

    return (
        <a href="" className="task" draggable onDragStart={handleOnTaskDragStart(item)} onDragOver={handleOnDragOver} onDrop={handleOnTaskDrop(id)}>
            <p className="task__text">{text}</p>
        </a>
    );
};

export default Task;