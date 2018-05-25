import { CHANGE_BOARD_POSITION, CHANGE_BOARD_TITLE } from '../actions/types';

const getSlicedArray = (array, draggedItem, dropedBoardId) => {
    const draggedIndex = array.findIndex(item => item.id === draggedItem.id)
    const dropedIndex = array.findIndex(item => item.id === dropedBoardId)

    const element = array[draggedIndex];

    return {
        element,
        newArray: [
            ...array.slice(0, draggedIndex),
            ...array.slice(draggedIndex + 1)
        ],
        position: draggedIndex > dropedIndex ? 0 : 1
    }

}

const boards = [
    {
        id: 1,
        title: 'Pierwsza tablica'
    },
    {
        id: 2,
        title: 'Druga tablica'
    },
    {
        id: 3,
        title: 'Trzecia tablica'
    }
]

export default (state = boards, action) => {
    let newArray, element, position;
    switch (action.type) {
        case CHANGE_BOARD_POSITION:
            ({ newArray, element, position } = getSlicedArray(state, action.draggedItem, action.dropedBoardId))

            const dropedIndex = newArray.findIndex(item => item.id === action.dropedBoardId)
            newArray.splice(dropedIndex + position, 0, element)

            return newArray

        case CHANGE_BOARD_TITLE:
            const array = state.slice();

            const itemIndex = array.findIndex(item => item.id === action.newItem.id)
            array.splice(itemIndex, 1, action.newItem);

            return array;

        default:
            return state;
    }
};