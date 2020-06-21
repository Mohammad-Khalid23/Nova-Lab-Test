import * as types from "./types";

export const loginRequest = () => ({
    type: types.LOGIN_REQUEST,
});

export const loginSuccess = (data) => ({
    type: types.LOGIN_SUCCESS,
    payload: data
});

export const loginFailed = (err) => ({
    type: types.LOGIN_FAILED,
    payload: err
});

export const signUpRequest = () => ({
    type: types.SIGN_REQUEST,
})

export const signUpSuccess = (data) => ({
    type: types.SIGN_SUCCESS,
    payload: data
});

export const signUpFailed = (err) => ({
    type: types.SIGN_FAILED,
    payload: err
});

export const fetchingRequest = () => ({
    type: types.IS_FETCHING_REQUEST
})

export const fetchingComplete = () => ({
    type: types.IS_FETCHING_COMPLETE
})

export const saveToken = (data) => ({
    type: types.SAVE_TOKEN,
    payload: data
});

export const unauthorize = () => ({
    type: types.UNAUTHORIZED_USER,
});

export const logout = () => ({
    type: types.LOGOUT,
});