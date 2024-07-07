import { configureStore } from '@reduxjs/toolkit';
import { prodCategorySlice } from '../components/sidebar/prodCategorySlice';

import { productSlice } from '../components/displayProduct/displayProductSlice'

const store = configureStore({
    reducer: {
        productCategories: prodCategorySlice.reducer,
        displayProduct: productSlice.reducer
    }
})

export default store