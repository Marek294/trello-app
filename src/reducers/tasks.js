import {
  CHANGE_TASK_BOARD,
  CHANGE_TASK_POSITION,
  CHANGE_TASK_TITLE
} from "../actions/types";

const getSlicedArray = (array, draggedItem, dropedId, boardId) => {
  const draggedIndex = array.findIndex(item => item.id === draggedItem.id);
  const dropedIndex = array.findIndex(item => item.id === dropedId);

  const element = array[draggedIndex];

  const position =
    draggedIndex > dropedIndex || element.board !== boardId ? 0 : 1;

  element.board = boardId;

  return {
    element,
    newArray: [
      ...array.slice(0, draggedIndex),
      ...array.slice(draggedIndex + 1)
    ],
    position
  };
};

const tasks = [
  {
    id: 1,
    board: 1,
    title: "Pierwsze zadanie"
  },
  {
    id: 2,
    board: 1,
    title: "Drugie zadanie"
  },
  {
    id: 3,
    board: 1,
    title: "Trzecie zadanie"
  },
  {
    id: 4,
    board: 2,
    title: "Czwarte zadanie"
  }
];

export default (state = tasks, action) => {
  let newArray, element, position;
  switch (action.type) {
    case CHANGE_TASK_POSITION:
      ({ newArray, element, position } = getSlicedArray(
        [...state],
        action.draggedItem,
        action.dropedTaskId,
        action.boardId
      ));

      const dropedIndex = newArray.findIndex(
        item => item.id === action.dropedTaskId
      );

      return [
        ...newArray.slice(0, dropedIndex + position),
        element,
        ...newArray.slice(dropedIndex + position)
      ];

    case CHANGE_TASK_BOARD:
      ({ newArray, element, position } = getSlicedArray(
        [...state],
        action.draggedItem,
        null,
        action.boardId
      ));

      return [...newArray, element];

    case CHANGE_TASK_TITLE:
      const itemIndex = [...state].findIndex(
        item => item.id === action.newItem.id
      );

      return [
        ...state.slice(0, itemIndex),
        action.newItem,
        ...state.slice(itemIndex + 1)
      ];

    default:
      return state;
  }
};
