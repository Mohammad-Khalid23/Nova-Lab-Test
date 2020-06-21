import {
    USERS_GET_SUCCESS,
    USER_CREATE_SUCCESS,
    USER_UPDATE_SUCCESS,
    SAVE_ONLINE_USER
} from './../constants/actionTypes';

import initialState from './../store/initialState';

const user_reducer = (state = initialState.users, action) => {
    switch (action.type) {

        case USERS_GET_SUCCESS:
            return Object.assign(
                {},
                state,
                { allusers: [...action.data.data] }
            );
        case USER_CREATE_SUCCESS:
            return Object.assign(
                {},
                state,
                { allusers: [...action.data.data] }
            );
        case USER_UPDATE_SUCCESS:
            return Object.assign(
                {},
                state,
                { allusers: [...action.data.data] }
            );
        case SAVE_ONLINE_USER:
            return Object.assign(
                {},
                state,
                { onlineUser: action.data }
            );
        default:
            return state;
    }
};

export default user_reducer;
