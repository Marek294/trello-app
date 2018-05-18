import React from 'react';
import Board from '../Board/Board';

const Boards = () => {
    return (
        <div className='boards'>
            <h1 className='boards__title'>Trello App</h1>
            <Board />  
        </div>
    );
};

export default Boards;