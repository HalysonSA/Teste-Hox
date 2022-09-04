import { configureStore, combineReducers} from '@reduxjs/toolkit';
import ProductSlice from './reducers'


const  rootReducer = combineReducers({
    product: ProductSlice
})

const store = configureStore({
    reducer:rootReducer
})  

export default store;