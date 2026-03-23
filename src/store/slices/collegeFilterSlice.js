import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    collegeTabActive: null,
}

const collegeFilterSlice = createSlice({
    name: "collegeFilterRedux",
    initialState,
    reducers: {
        setTabActiveFor: (state,action) => {
            state.collegeTabActive = action.payload;
        }
    }
});

export const { setTabActiveFor } = collegeFilterSlice.actions;
export default collegeFilterSlice.reducer;