import React from 'react';
import './Task.css';

const handleOnDragOver = e => e.preventDefault();

const Task = (props) => {
    const { item, handleOnTaskDragStart, handleOnTaskDrop } = props;
    const { id, text } = item;

    return (
        <a href="" className="allowDrag" onDragStart={handleOnTaskDragStart(id)}>
            <div className="task" draggable onDragOver={handleOnDragOver} onDrop={handleOnTaskDrop(id)}>
                <p className="task__text">{text}</p>
            </div>
        </a>
    );
};

export default Task;