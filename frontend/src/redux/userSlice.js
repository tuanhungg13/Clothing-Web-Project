import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetCurrent } from "../service/userApiService";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        current: null
    },
    reducers: {
        login: (state, action) => {
            console.log("check action login:", action);
            state.isLoggedIn = true;
            state.current = action.payload.userData
            // state.token = action.payload.token;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.current = null
        }
    },
    extraReducers: (builder) => {
        // Bắt đầu thực hiện action lấy dữ liệu người dùng (Promise pending)
        builder.addCase(getCurrent.pending, (state) => {
        });

        // Khi thực hiện action lấy dữ liệu người dùng thành công (Promise fulfilled)
        builder.addCase(getCurrent.fulfilled, (state, action) => {
            state.current = action.payload.DT;
        });

        // Khi thực hiện action lấy dữ liệu người dùng thất bại (Promise rejected)
        builder.addCase(getCurrent.rejected, (state, action) => {
            // Tắt trạng thái loading
            state.isLoading = false;

        })
    }
})

export const { login, logout } = userSlice.actions

export const getCurrent = createAsyncThunk("user/getCurrent", async (data, { rejectWithValue }) => {
    const response = await apiGetCurrent();
    console.log("check responseUser:", response)
    if (response.EC === 1) {
        return rejectWithValue(response)
    }
    return response
})

