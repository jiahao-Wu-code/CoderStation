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
        issueTypeId: 'all',
        bookTypeId: 'all',
    },
    reducers: {
        updateIssueTypeId: (state, { payload }) => {
            state.issueTypeId = payload
        },
        updateStoreBookTypeId: (state, { payload }) => {
            state.bookTypeId = payload;
        },
    },
    // 专门处理异步的 reducer
    // extraReducers: {
    //     [getTypeList.fulfilled]: (state, { payload }) => {
    //         state.typeList = payload
    //     }
    // }

    extraReducers: (builder) => {
        builder.addCase(getTypeList.fulfilled, (state, { payload }) => {
            state.typeList = payload
        })
    },
})

export const { updateIssueTypeId, updateStoreBookTypeId } = typeSlice.actions

export default typeSlice.reducer