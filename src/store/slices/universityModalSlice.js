import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isOpen: false,
    collegeDetails:null,
    canBrochureDownload:false,
    brochureDownloadUrl:null
}

const universityModalSlice = createSlice({
    name: "universityModal",
    initialState,
    reducers: {
        openModal: (state) => {
            state.isOpen = true;
        },
        closeModal: (state) => {
            state.isOpen = false;
        },
        setCollegeDetails:(state,action)=>{
            state.collegeDetails = action.payload;
        },
        setCanBrochureDownload:(state,action)=>{
            state.canBrochureDownload = action.payload;
        },
        setBrochureDownloadUrl:(state,action)=>{
            state.brochureDownloadUrl = action.payload;
        }
    }
});

export const { openModal, closeModal,setCollegeDetails,setCanBrochureDownload,setBrochureDownloadUrl } = universityModalSlice.actions;
export default universityModalSlice.reducer;