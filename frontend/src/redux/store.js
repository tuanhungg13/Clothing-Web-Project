import { configureStore } from '@reduxjs/toolkit';
import { prodCategorySlice } from '../components/sidebar/prodCategorySlice';
import { productSlice } from './displayProductSlice';
import { userSlice } from './userSlice';



const store = configureStore({
    reducer: {
        productCategories: prodCategorySlice.reducer,
        displayProduct: productSlice.reducer,
        user: userSlice.reducer
    },
})

export default store