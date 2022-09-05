import products from '../database/db.json';

import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const ProductSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.push(...action.payload);
        },
        addProduct: (state, action) => {
            state.push(action.payload);
        },
        deleteProduct: (state, action) => {
            const index = state.findIndex(
                (product) => product.id === action.payload
            );
            state.splice(index, 1);
        },
        updateProduct: (state, action) => {
            const index = state.findIndex(
                (product) => product.id === action.payload.id
            );
            if (index !== -1) {
                state[index] = action.payload;
            }
        },
        orderProduct: (state, action) => {
            const { type } = action.payload;
            if (type === 'priceGrow') {
                state.sort((a, b) => a.price - b.price);
            } else if (type === 'priceDec') {
                state.sort((a, b) => b.price - a.price);
            } else if (type === 'dateManuGrow') {
                state.sort(
                    (a, b) => new Date(a.dateManu) - new Date(b.dateManu)
                );
            } else if (type === 'dateManuDec') {
                state.sort(
                    (a, b) => new Date(b.dateManu) - new Date(a.dateManu)
                );
            } else if (type === 'dateExpGrow') {
                state.sort((a, b) =>
                    a.dateExp === undefined
                        ? (a.dateExp = '1111-11-11')
                        : new Date(a.dateExp) - new Date(b.dateExp)
                );
            } else if (type === 'dateExpDec') {
                state.sort((a, b) =>
                    b.dateExp === undefined
                        ? (b.dateExp = '1111-11-11')
                        : new Date(b.dateExp) - new Date(a.dateExp)
                );
            } else if (type === 'descriptionGrow') {
                state.sort((a, b) =>
                    a.description.localeCompare(b.description)
                );
            } else if (type === 'descriptionDec') {
                state.sort((a, b) =>
                    b.description.localeCompare(a.description)
                );
            }
        },
    },
});
export const { addProduct, deleteProduct, orderProduct, setProducts } =
    ProductSlice.actions;
export default ProductSlice.reducer;
