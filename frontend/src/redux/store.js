import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { prodCategorySlice } from './prodCategorySlice';
import storage from 'redux-persist/lib/storage'
import { persistStore, persistReducer } from 'redux-persist';
import userSlice from './userSlice';
import cartSlice from './cartSlice';

const userConfig = {
    key: "profile",
    storage,
    whitelist: ["isLoggedIn", "accessToken"]
}

export const store = configureStore({
    reducer: {
        productCategories: prodCategorySlice.reducer,
        user: persistReducer(userConfig, userSlice),
        cart: cartSlice.reducer
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