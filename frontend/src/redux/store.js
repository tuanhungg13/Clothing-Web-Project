import { configureStore } from '@reduxjs/toolkit';
import { prodCategorySlice } from '../components/sidebar/prodCategorySlice';

const store = configureStore({
    reducer: {
        productCategories: prodCategorySlice.reducer
    }
})

export default store