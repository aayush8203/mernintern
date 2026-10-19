import { userActions } from "./user-slice";
import { axiosInstance } from "../../utils/axios";

export const getSignup = (user) => async (dispatch) => {
  try {
    dispatch(userActions.getSignupRequest());
    const { data } = await axiosInstance.post("/v1/rent/users/signup", user);
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    dispatch(userActions.getSignupDetails(data.user || data));
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Signup failed";
    dispatch(userActions.getError(message));
  }
};

export const getLogin = (user) => async (dispatch) => {
  try {
    dispatch(userActions.getLoginRequest());
    const { data } = await axiosInstance.post("/v1/rent/users/login", user);
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
    dispatch(userActions.getLoginDetails(data.user || data));
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Login failed";
    dispatch(userActions.getError(message));
  }
};

export const currentUser = () => async (dispatch) => {
  try {
    dispatch(userActions.getCurrentRequest());
    const { data } = await axiosInstance.get("/v1/rent/users/me");
    dispatch(userActions.getCurrentUser(data.user || data));
  } catch {
    localStorage.removeItem("token");
    dispatch(userActions.getlogout(null));
  }
};

export const updateUser = (user) => async (dispatch) => {
  try {
    dispatch(userActions.getUpdateUserRequest());
    const { data } = await axiosInstance.patch("/v1/rent/users/updateMe", user);
    const updatedUser = data.data?.user || data.user || data;
    dispatch(userActions.getCurrentUser(updatedUser));
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Update failed";
    dispatch(userActions.getError(message));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  try {
    await axiosInstance.post("/v1/rent/users/forgotPassword", email);
    dispatch(userActions.getPasswordSuccess(true));
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Failed to send reset email";
    dispatch(userActions.getError(message));
  }
};

export const resetPassword = (token, password) => async (dispatch) => {
  try {
    await axiosInstance.patch(`/v1/rent/users/resetPassword/${token}`, password);
    dispatch(userActions.getPasswordSuccess(true));
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Reset password failed";
    dispatch(userActions.getError(message));
  }
};

export const updatePassword = (password) => async (dispatch) => {
  try {
    dispatch(userActions.getPasswordRequest());
    await axiosInstance.patch("/v1/rent/users/updateMyPassword", password);
    dispatch(userActions.getPasswordSuccess(true));
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Password update failed";
    dispatch(userActions.getError(message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(userActions.getlogoutRequest());
    await axiosInstance.get("/v1/rent/users/logout");
    localStorage.removeItem("token");
    dispatch(userActions.getlogout(null));
  } catch (error) {
    localStorage.removeItem("token");
    dispatch(userActions.getlogout(null));
  }
};