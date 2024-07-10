import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        token: null,
        current: null
    },
    reducers: {
        login: (state, action) => {
            console.log("check action login:", action);
            state.isLoggedIn = action.payload.isLoggedIn;
            state.current = action.payload.userData;
            state.token = action.payload.token;
        }
    },
    // extraReducers: (builder) => {
    //     // Bắt đầu thực hiện action lấy dữ liệu sản phẩm (Promise pending)
    //     builder.addCase(fetchProducts.pending, (state) => {
    //         // Bật trạng thái loading
    //         state.isLoading = true;
    //     });

    //     // Khi thực hiện action lấy dữ liệu sản phẩm thành công (Promise fulfilled)
    //     builder.addCase(fetchProducts.fulfilled, (state, action) => {
    //         // Tắt trạng thái loading, lưu thông tin products vào store
    //         state.isLoading = false;
    //         state.products = action.payload.DT;
    //     });

    //     // Khi thực hiện action lấy dữ liệu sản phẩm thất bại (Promise rejected)
    //     builder.addCase(fetchProducts.rejected, (state, action) => {
    //         // Tắt trạng thái loading
    //         state.isLoading = false;

    //     });
    // }
})


export const { login } = userSlice.actions

export default userSlice.reducer
