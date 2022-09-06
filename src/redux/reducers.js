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

            switch (type) {
                case 'priceGrow':
                    state.sort((a, b) => a.price - b.price);
                    break;
                case 'priceDec':
                    state.sort((a, b) => b.price - a.price);
                    break;
                case 'descriptionGrow':
                    state.sort((a, b) =>
                        a.description.localeCompare(b.description)
                    );
                    break;
                case 'descriptionDec':
                    state.sort((a, b) =>
                        b.description.localeCompare(a.description)
                    );
                    break;
                case 'dateManuGrow':
                    state.sort(
                        (a, b) => new Date(a.dateManu) - new Date(b.dateManu)
                    );
                    break;
                case 'dateManuDec':
                    state.sort(
                        (a, b) => new Date(b.dateManu) - new Date(a.dateManu)
                    );
                    break;
                case 'dateExpGrow':
                    state.sort((a, b) =>
                        a.dateExp === undefined
                            ? (a.dateExp = '1111-11-11')
                            : new Date(a.dateExp) - new Date(b.dateExp)
                    );
                    break;
                case 'dateExpDec':
                    state.sort((a, b) =>
                        b.dateExp === undefined
                            ? (b.dateExp = '1111-11-11')
                            : new Date(b.dateExp) - new Date(a.dateExp)
                    );
                // eslint-disable-next-line no-fallthrough
                default:
                    console.log('inalterado');
                    break;
            }
        },
    },
});
export const {
    addProduct,
    deleteProduct,
    orderProduct,
    setProducts,
    updateProduct,
} = ProductSlice.actions;
export default ProductSlice.reducer;
