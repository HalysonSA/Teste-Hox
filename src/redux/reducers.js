import products from '../database/db.json';
/* eslint-disable import/no-anonymous-default-export */

const initialState = products.products;

export default function (state = initialState, action) {
    switch (action.type) {
        case 'ADD_PRODUCT':
            return [...state, action.payload];

        default:
            return state;
    }
}
