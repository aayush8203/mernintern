import {createSlice} from '@reduxjs/toolkit';

const extractUser = (payload) => {
    if (!payload) return null;
    if (payload.user) return payload.user;
    if (payload.data?.user) return payload.data.user;
    return payload;
};

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isAuthenticated: false,
        loading: false,
        user: null,
        error: null,
        success: false
    },
    reducers: {
        getSignupRequest(state){
            state.loading = true;
            state.error = null;
        },
        getSignupDetails(state, action){
            state.user = extractUser(action.payload);
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        getLoginRequest(state){
            state.loading = true;
            state.error = null;
        },
        getLoginDetails(state, action){
            state.user = extractUser(action.payload);
            state.isAuthenticated = true;
            state.loading = false;
            state.error = null;
        },
        getError(state, action){
            state.error = action.payload;
            state.loading = false;
        },
        getCurrentRequest(state){
            state.loading = true;
        },
        getUpdateUserRequest(state){
            state.loading = true;
            state.error = null;
        },
        getCurrentUser(state, action){
            state.user = extractUser(action.payload);
            state.isAuthenticated = !!state.user;
            state.loading = false;
        },
        getlogoutRequest(state){
            state.loading = true;
        },
        getlogout(state,action){
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
        },
        getPasswordRequest(state){
            state.loading = true;
            state.error = null;
        },
        getPasswordSuccess(state, action){
            state.success = action.payload;
            state.loading = false;
        },
        clearErrors(state){
            state.error = null;
        },
        clearError(state){
            state.error = null;
        }
    }
})


export const userActions = userSlice.actions;
export default userSlice;