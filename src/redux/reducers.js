/* eslint-disable import/no-anonymous-default-export */
export default function (state = [], action) {
    switch (action.type) {
        case 'ADD_PRODUCT':
            return [...state, action.payload];

        default:
            return state;
    }
}
