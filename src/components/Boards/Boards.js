import React, { Component } from 'react';
import Board from '../Board/Board';

class Boards extends Component {
    // onBoardDrop = id => e => {
    //     e.preventDefault();
    //     console.log('board drop', id)
    // }

    render() {
        return (
            <div className='boards'>
                <h1 className='boards__title'>Trello App</h1>
                <Board />
                {/* <Board onBoardDrop={this.onBoardDrop} id={2} /> */}
            </div>
        );
    }
}

export default Boards;