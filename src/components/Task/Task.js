import React from 'react';
import './Task.css';

const onDragOver = e => e.preventDefault();

const Task = (props) => {
    const { item, onDragStart, onDrop } = props;
    const { id, text } = item;

    return (
        <div className="task" draggable onDragStart={onDragStart(id)} onDragOver={onDragOver} onDrop={onDrop(id)}>
            <p className="task__text">{text}</p>
        </div>
    );
};

export default Task;