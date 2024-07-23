import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "user",
    initialState: {
        cartFromCookies: []
    },
    reducers: {
        getCartFromCookies: (state, action) => {
            console.log("check action login:", action);
            state.cartFromCookies = action.payload.cart;
        },
    }
})

export const { getCartFromCookies } = cartSlice.actions


export default cartSlice
