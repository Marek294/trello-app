import { CHANGE_BOARD_POSITION, CHANGE_BOARD_TITLE } from "./types";

export const changeBoardPosition = (draggedItem, dropedBoardId) => {
  return {
    type: CHANGE_BOARD_POSITION,
    draggedItem,
    dropedBoardId
  };
};

export const changeBoardTitle = newItem => {
  return {
    type: CHANGE_BOARD_TITLE,
    newItem
  };
};
