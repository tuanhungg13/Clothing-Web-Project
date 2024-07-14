import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { prodCategorySlice } from '../components/sidebar/prodCategorySlice';
import storage from 'redux-persist/lib/storage'
import { productSlice } from './displayProductSlice';
import { persistStore, persistReducer } from 'redux-persist';
import userSlice from './userSlice';


const userConfig = {
    key: "profile",
    storage,
    whitelist: ["isLoggedIn", "token"]
}

export const store = configureStore({
    reducer: {
        productCategories: prodCategorySlice.reducer,
        displayProduct: productSlice.reducer,
        user: persistReducer(userConfig, userSlice)
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                // Ignore these action types
                ignoredActions: ['persist/PERSIST']
            },
        }),
})

export const persistor = persistStore(store)