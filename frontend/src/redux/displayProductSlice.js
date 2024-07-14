import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiGetProducts } from "../service/productApiService";

export const productSlice = createSlice({
    name: "product",
    initialState: {
        products: [],
        productBestSeller: [],
        newProducts: [],
        isLoading: false,
    },
    reducers: {
    },
    extraReducers: (builder) => {
        // Bắt đầu thực hiện action lấy dữ liệu sản phẩm (Promise pending)
        builder.addCase(fetchProducts.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        });

        // Khi thực hiện action lấy dữ liệu sản phẩm thành công (Promise fulfilled)
        builder.addCase(fetchProducts.fulfilled, (state, action) => {
            // Tắt trạng thái loading, lưu thông tin products vào store
            state.isLoading = false;
            state.products = action.payload.DT;
        });

        // Khi thực hiện action lấy dữ liệu sản phẩm thất bại (Promise rejected)
        builder.addCase(fetchProducts.rejected, (state, action) => {
            // Tắt trạng thái loading
            state.isLoading = false;

        });

        // Bắt đầu thực hiện action lấy dữ liệu sản phẩm bán chạy(Promise pending)

        builder.addCase(fetchBestSellingProduct.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(fetchBestSellingProduct.fulfilled, (state, action) => {
            state.isLoading = false;
            state.productBestSeller = action.payload.DT;
        });

        builder.addCase(fetchBestSellingProduct.rejected, (state, action) => {
            state.isLoading = false;

        });

        // Bắt đầu thực hiện action lấy dữ liệu sản phẩm mới(Promise pending)

        builder.addCase(fetchNewProducts.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(fetchNewProducts.fulfilled, (state, action) => {
            state.isLoading = false;
            state.newProducts = action.payload.DT;
        });

        builder.addCase(fetchNewProducts.rejected, (state, action) => {
            state.isLoading = false;

        });
    },
})



//redux thunk

export const fetchProducts = createAsyncThunk("product/fetchProducts", async (data, { rejectWithValue }) => {
    const response = await apiGetProducts(data)
    if (response.EC === 1) {
        return rejectWithValue(response)
    }
    return response
})

export const fetchBestSellingProduct = createAsyncThunk("product/fetchBestSellingProduct", async (data, { rejectWithValue }) => {
    const response = await apiGetProducts(data)
    if (response.EC === 1) {
        return rejectWithValue(response)
    }
    return response
})

export const fetchNewProducts = createAsyncThunk("product/fetchNewProducts", async (data, { rejectWithValue }) => {
    const response = await apiGetProducts(data)
    if (response.EC === 1) {
        return rejectWithValue(response)
    }
    return response
})
