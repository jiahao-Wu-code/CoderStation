import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getInterviewTitle } from "../api/note";


export const getInterviewTitleAsync = createAsyncThunk(
    'interview/getInterviewTitleAsync',
    async (_, thunkApi) => {
        const { data } = await getInterviewTitle()
        // console.log("data>>>", data)
        thunkApi.dispatch(initialInterviewList(data))
    }
)

const interviewSlice = createSlice({
    name: "interview",
    initialState: {
        interviewTitleList: []
    },
    reducers: {
        initialInterviewList: (state, { payload }) => {
            // console.log("payload", payload)
            state.interviewTitleList = payload
        }
    }
})

export const { initialInterviewList } = interviewSlice.actions

export default interviewSlice.reducer;