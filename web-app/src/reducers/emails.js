import {
    GET_EMAILS,
    ADD_EMAIL,
    REMOVE_EMAIL
} from './../constants/actionTypes';

import initialState from './../store/initialState';

const reducer = (state = initialState.emails, action) => {
    switch (action.type) {
        case GET_EMAILS:
            return [...action.data];
        case ADD_EMAIL:
            return [...state, action.data];
        case REMOVE_EMAIL:
            return state.filter(item => item._id !== action.data)
        default:
            return state;
    }
};

export default reducer;
