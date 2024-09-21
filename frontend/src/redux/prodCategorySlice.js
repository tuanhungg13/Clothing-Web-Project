import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getProductCategories } from "../service/prodCategoryApiService";


export const prodCategorySlice = createSlice({
    name: "prodCategories",
    initialState: {
        categories: [],
        isLoading: false,
        errorMessage: null
    },
    reducers: {
        // getState: (state, action) => {
        //     // state.categories = action.payload.DT
        // }
    },
    extraReducers: (builder) => {
        // Bắt đầu thực hiện action login (Promise pending)
        builder.addCase(fetchProductCategories.pending, (state) => {
            // Bật trạng thái loading
            state.isLoading = true;
        });

        // Khi thực hiện action login thành công (Promise fulfilled)
        builder.addCase(fetchProductCategories.fulfilled, (state, action) => {
            // Tắt trạng thái loading, lưu thông tin user vào store
            state.isLoading = false;
            state.categories = action?.payload?.DT;
        });

        // Khi thực hiện action login thất bại (Promise rejected)
        builder.addCase(fetchProductCategories.rejected, (state, action) => {
            // Tắt trạng thái loading, lưu thông báo lỗi vào store
            state.isLoading = false;
            state.errorMessage = action?.payload?.EM;
            state.errorMessage = action?.payload?.EM || "Failed to fetch categories";
        });
    },
})





export const fetchProductCategories = createAsyncThunk("prodCategories/fetchProductCategories", async (data, { rejectWithValue }) => {
    const response = await getProductCategories()
    if (response && response.EC === 1) {
        return rejectWithValue(response)
    }
    return response
}
)