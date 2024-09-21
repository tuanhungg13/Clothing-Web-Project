import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiGetCurrent } from "../service/userApiService";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoggedIn: false,
        current: null,
        accessToken: null
    },
    reducers: {
        login: (state, action) => {
            state.isLoggedIn = true;
            state.current = action.payload.userData
            state.accessToken = action.payload.accessToken;
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.current = null;
            state.accessToken = null;
        }
    },
    extraReducers: (builder) => {
        // Bắt đầu thực hiện action lấy dữ liệu người dùng (Promise pending)
        builder.addCase(getCurrent.pending, (state) => {
        });

        // Khi thực hiện action lấy dữ liệu người dùng thành công (Promise fulfilled)
        builder.addCase(getCurrent.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.current = action?.payload;
        });

        // Khi thực hiện action lấy dữ liệu người dùng thất bại (Promise rejected)
        builder.addCase(getCurrent.rejected, (state, action) => {
            // Tắt trạng thái loading
            state.isLoggedIn = false;
            state.current = null;
            state.accessToken = null

        })
    }
})

export const { login, logout } = userSlice.actions

export const getCurrent = createAsyncThunk("user/getCurrent", async (data, { rejectWithValue }) => {
    const response = await apiGetCurrent();
    if (response && response.EC === 1) {
        return rejectWithValue(response)
    }
    return response.DT
})

export default userSlice.reducer
