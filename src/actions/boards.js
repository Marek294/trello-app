import { CHANGE_BOARD_POSITION } from './types';

export const changeBoardPosition = (draggedItem, dropedBoardId) => {
    return {
        type: CHANGE_BOARD_POSITION,
        draggedItem,
        dropedBoardId
    }
}