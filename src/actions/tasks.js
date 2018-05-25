import { CHANGE_TASK_BOARD } from './types';

export const changeTaskBoard = state => {
    return {
        type: CHANGE_TASK_BOARD,
        state
    }
}

export const boundChangeTaskBoard = state => dispatch => dispatch(changeTaskBoard(state));