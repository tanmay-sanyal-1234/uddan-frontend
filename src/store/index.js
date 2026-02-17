import { configureStore } from "@reduxjs/toolkit";
import universityModalSlice from "./slices/universityModalSlice";

export const store = configureStore({
    reducer: {
        universityModal: universityModalSlice,
    },
});