import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../../service/productApiService";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        isLoading: false,
    },
    reducers: {
        // getState: (state, action) => {
        //     // state.categories = action.payload.DT
        // }
    },
    extraReducers: (builder) => {
        // Bắt đầu thực hiện action login (Promise pending)
        builder.addCase(fetchProducts.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        });

        // Khi thực hiện action login thành công (Promise fulfilled)
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            // Tắt trạng thái loading, lưu thông tin user vào store
            state.isLoading = false;
            state.products = action.payload.DT;
        });

        // Khi thực hiện action login thất bại (Promise rejected)
        builder.addCase(fetchProducts.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;

        });
    },
})





export const fetchProducts = createAsyncThunk("product/fetchProducts", async (data, { rejectWithValue }) => {
    const response = await getProducts()
    console.log("check fetchProducts:", response);
    if (response.EC === 1) {
        return rejectWithValue(response)
    }
    return response
})