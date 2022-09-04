import products from '../database/db.json';

import { createSlice } from '@reduxjs/toolkit';
/* eslint-disable import/no-anonymous-default-export */

const initialState = products.products || [];

const ProductSlice = createSlice({
    name: 'products',
    initialState: initialState,
    reducers: {
        addProduct: (state, action) => {
            state.push(action.payload);
        },
        deleteProduct: (state, action) => {
            state.filter((product) => product.id !== action.payload);
        },
        updateProduct: (state, action) => {
            const index = state.findIndex((product) => product.id === action.payload.id);
            if (index !== -1) {
                state[index] = action.payload;
            }
        }
    },
});
export const { addProduct } = ProductSlice.actions;
export default ProductSlice.reducer;
