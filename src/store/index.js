import { configureStore } from "@reduxjs/toolkit";
import universityModalSlice from "./slices/universityModalSlice";
import collegeFilterSlice from "./slices/collegeFilterSlice"

export const store = configureStore({
    reducer: {
        universityModal: universityModalSlice,
        collegeFilterRedux : collegeFilterSlice
    },
});