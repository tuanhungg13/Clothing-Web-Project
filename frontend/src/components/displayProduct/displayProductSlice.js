import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProducts } from "../../service/productApiService";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        productBestSeller: [],
        newProducts: [],
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
        builder.addCase(fetchBestSellingProduct.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        });

        // Khi thực hiện action login thành công (Promise fulfilled)
        builder.addCase(fetchBestSellingProduct.fulfilled, (state, action) => {
            // Tắt trạng thái loading, lưu thông tin user vào store
            state.isLoading = false;
            state.productBestSeller = action.payload.DT;
        });

        // Khi thực hiện action login thất bại (Promise rejected)
        builder.addCase(fetchBestSellingProduct.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;

        });
        builder.addCase(fetchNewProducts.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        });

        // Khi thực hiện action login thành công (Promise fulfilled)
        builder.addCase(fetchNewProducts.fulfilled, (state, action) => {
            // Tắt trạng thái loading, lưu thông tin user vào store
            state.isLoading = false;
            state.newProducts = action.payload.DT;
        });

        // Khi thực hiện action login thất bại (Promise rejected)
        builder.addCase(fetchNewProducts.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;

        });
    },
})





export const fetchProducts = createAsyncThunk("product/fetchProducts", async (data, { rejectWithValue }) => {
    const response = await getProducts(data)
    console.log("check fetchProducts:", response);
    if (response.EC === 1) {
        return rejectWithValue(response)
    }
    return response
})

export const fetchBestSellingProduct = createAsyncThunk("product/fetchBestSellingProduct", async (data, { rejectWithValue }) => {
    const response = await getProducts(data)
    console.log("check fetchBestSellingProduct:", response);
    if (response.EC === 1) {
        return rejectWithValue(response)
    }
    return response
})

export const fetchNewProducts = createAsyncThunk("product/fetchNewProducts", async (data, { rejectWithValue }) => {
    const response = await getProducts(data)
    console.log("check fetchNewProducts:", response);
    if (response.EC === 1) {
        return rejectWithValue(response)
    }
    return response
})