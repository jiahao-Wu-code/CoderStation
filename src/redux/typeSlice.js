import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getType } from "../api/type";

export const getTypeList = createAsyncThunk(
    "type/getTypeList",
    async () => {
        const responce = await getType();
        // console.log("getType", responce)
        return responce.data
    }
)

const typeSlice = createSlice({
    name: "type",
    initialState: {
        typeList: [],
    },
    reducers: {

    },
    // 专门处理异步的 reducer
    extraReducers: {
        [getTypeList.fulfilled]: (state, { payload }) => {
            state.typeList = payload
        }
    }
})

export default typeSlice.reducer