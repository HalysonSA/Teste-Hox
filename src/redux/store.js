import { configureStore, combineReducers } from '@reduxjs/toolkit';
import productReducer from './reducers'

const  rootReducer = combineReducers({
    product: productReducer
})

const store = configureStore({reducer:rootReducer})

export default store;