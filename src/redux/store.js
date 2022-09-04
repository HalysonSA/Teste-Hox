import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import ProductSlice from './reducers'
import thunk from 'redux-thunk'; 

const  rootReducer = combineReducers({
    product: ProductSlice
})

const store = configureStore({
    reducer:rootReducer, 
    middleware: [thunk]
})  

export default store;