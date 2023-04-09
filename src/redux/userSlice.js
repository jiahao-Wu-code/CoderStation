import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLogin: false, // 登录状态
        userInfo: {}
    },
    reducers: {
        initUserInfo: (state, { payload }) => {
            state.userInfo = payload
        },
        changeLoginStatus: (state, { payload }) => {
            state.isLogin = payload;
        }
    }
})


export const { initUserInfo, changeLoginStatus } = userSlice.actions

export default userSlice.reducer