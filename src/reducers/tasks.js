import { CHANGE_TASK_BOARD } from '../actions/types';

const tasks = [
    {
        id: 1,
        board: 1,
        title: 'Pierwsze zadanie'
    },
    {
        id: 2,
        board: 1,
        title: 'Drugie zadanie'
    },
    {
        id: 3,
        board: 1,
        title: 'Trzecie zadanie'
    },
    {
        id: 4,
        board: 2,
        title: 'Czwarte zadanie'
    }
]

export default (state = tasks, action) => {
    switch (action.type) {
        case CHANGE_TASK_BOARD:
            return action.state
        default:
            return state;
    }
};