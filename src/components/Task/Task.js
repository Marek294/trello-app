import React from 'react';
import './Task.css';

const onDragOver = e => e.preventDefault();

const Task = (props) => {
    const { item, onDragStart, onDrop } = props;
    const { id, text } = item;

    return (
        <a href="" className="allowDrag" onDragStart={onDragStart(id)}>
            <div className="task" draggable onDragOver={onDragOver} onDrop={onDrop(id)}>
                <p className="task__text">{text}</p>
            </div>
        </a>
    );
};

export default Task;