import * as types from "./types";

let initialState = {
    sellers: null,
    isFetching: false
};

const sellerReducer = (state = initialState, action) => {
    console.log("actions in seller reucer",action)
    switch (action.type) {

        case types.FETCH_SELLERS_SUCCESS:
            return { ...state, sellers: action.payload, isFetching: false };

        case types.LOGIN_FAILED:
            return { ...state, isFetching: false };

        case types.SIGN_SUCCESS:
            return { ...state, isFetching: false };

        case types.SIGN_FAILED:
            return { ...state, isFetching: false };

        default: return state
    }
}

export default sellerReducer;