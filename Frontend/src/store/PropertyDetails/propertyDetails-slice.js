import {createSlice} from '@reduxjs/toolkit';

const propertyDetailsSlice = createSlice({
    name: 'propertyDetails',
    initialState: {
        propertydetails: null,
        propertyDetails: null,
        loading : false,
        error: null
    },
    reducers: {
        getListRequest: (state) => {
            state.loading = true;
            state.error = null;
        },
        getPropertyDetails(state, action){
            const data = action.payload?.data || action.payload;
            state.propertydetails = data;
            state.propertyDetails = data;
            state.loading = false;
        },
        getErrors(state, action){
            state.error = action.payload;
            state.loading = false;
        }
    }
})

export const propertyDetailsActions = propertyDetailsSlice.actions;
export default propertyDetailsSlice;