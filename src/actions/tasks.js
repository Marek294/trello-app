import { CHANGE_TASK_BOARD, CHANGE_TASK_POSITION } from './types';

export const changeTaskPosition = (draggedItem, dropedTaskId, boardId) => {
    return {
        type: CHANGE_TASK_POSITION,
        draggedItem,
        dropedTaskId,
        boardId
    }
}

export const changeTaskBoard = (draggedItem, boardId) => {
    return {
        type: CHANGE_TASK_BOARD,
        draggedItem,
        boardId
    }
}