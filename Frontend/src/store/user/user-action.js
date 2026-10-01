import {userActions} from './user-slice';
import {axiosInstance} from '../../utils/axios';

export const getSignup = (user) => async (dispatch) => {
    try {
        dispatch(userActions.getSignupRequest());
        const {data} = await axiosInstance.post('/v1/rent/users/signup', user);
        dispatch(userActions.getSignupDetails(data));

    }catch (error) {
        dispatch(userActions.getError(error.response.data));
    }
}

export const getLogin = (user) => async (dispatch) => {
    try {
        dispatch(userActions.getLoginRequest());
        const {data} = await axiosInstance.post('/v1/rent/users/login', user);
        dispatch(userActions.getLoginDetails(data));

    }catch (error) {
        dispatch(userActions.getError(error.response.data));

    }
}

export const currentUser = () => async (dispatch) => {
    try {
        dispatch(userActions.getCurrentRequest());
        const {data} = await axiosInstance.get('/v1/rent/users/me');
        dispatch(userActions.getCurrentUser(data));

    }catch {
        dispatch(userActions.getlogout(null));
    }
}

export const updateUser = (user) => async (dispatch) => {
    try {
        dispatch(userActions.getUpdateUserRequest());
        const {data} = await axiosInstance.put('/v1/rent/users/updateme', user);
        dispatch(userActions.getCurrentUser(data));

    }catch (error) {
        dispatch(userActions.getError(error.response.data));
    }
}

export const forgotPassword = (email) => async (dispatch) => {
    try {
        await axiosInstance.post('/v1/rent/users/forgotpassword', email);
        dispatch(userActions.getPasswordSuccess(true));

    }catch (error) {
        dispatch(userActions.getError(error.response.data));
    }
}

export const resetPassword = (token, password) => async (dispatch) => {
    try {
        await axiosInstance.patch(`/v1/rent/users/resetpassword/${token}`, password);
        dispatch(userActions.getPasswordSuccess(true));
    }catch (error) {
        dispatch(userActions.getError(error.response.data));
    }
}

export const updatePassword = (password) => async (dispatch) => {
    try {
        dispatch(userActions.getPasswordRequest());
        await axiosInstance.patch('/v1/rent/users/updatepassword', password);
        dispatch(userActions.getPasswordSuccess(true));
    }catch (error) {
        dispatch(userActions.getError(error.response.data));
    }
}

export const logout = () => async (dispatch) => {
    try {
        dispatch(userActions.getlogoutRequest());
        await axiosInstance.get('/v1/rent/users/logout');
        dispatch(userActions.getlogout(null));

    }catch (error) {
        dispatch(userActions.getError(error.response.data));
    }
};