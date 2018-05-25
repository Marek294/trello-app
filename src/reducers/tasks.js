import { CHANGE_TASK_BOARD, CHANGE_TASK_POSITION } from '../actions/types';

const getSlicedArray = (array, draggedItem, dropedId, boardId) => {
    const draggedIndex = array.findIndex(item => item.id === draggedItem.id)
    const dropedIndex = array.findIndex(item => item.id === dropedId)

    const element = array[draggedIndex];
    element.board = boardId;

    return {
        element,
        newArray: [
            ...array.slice(0, draggedIndex),
            ...array.slice(draggedIndex + 1)
        ],
        position: draggedIndex > dropedIndex ? 0 : 1
    }

}

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
    let newArray, element, position;
    switch (action.type) {
        case CHANGE_TASK_POSITION:
            ({ newArray, element, position } = getSlicedArray(state, action.draggedItem, action.dropedTaskId, action.boardId))

            const dropedIndex = newArray.findIndex(item => item.id === action.dropedTaskId)
            newArray.splice(dropedIndex + position, 0, element)

            return newArray

        case CHANGE_TASK_BOARD:
            ({ newArray, element, position } = getSlicedArray(state, action.draggedItem, null, action.boardId))

            newArray.push(element)

            return newArray

        default:
            return state;
    }
};