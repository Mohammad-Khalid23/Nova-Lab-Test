import * as types from "./types";

let initialState = {
    token: null,
    isFetching: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LOGIN_REQUEST:
        case types.SIGN_REQUEST:
        case types.IS_FETCHING_REQUEST:
            return { ...state, isFetching: true };

        case types.LOGIN_SUCCESS:
            return { ...state, token: action.payload.access_token, isFetching: false };

        case types.LOGIN_FAILED:
            return { ...state, isFetching: false };

        case types.SIGN_SUCCESS:
            return { ...state, isFetching: false };

        case types.SIGN_FAILED:
            return { ...state, isFetching: false };

        case types.IS_FETCHING_COMPLETE:
            return { ...state, isFetching: false };

        case types.SAVE_TOKEN:
            return { ...state, token: action.payload.data };

        case types.UNAUTHORIZED_USER:
            return { ...state, token: null };

        case types.LOGOUT:
            return { ...state, token: null };

        default: return state
    }
}

export default authReducer;