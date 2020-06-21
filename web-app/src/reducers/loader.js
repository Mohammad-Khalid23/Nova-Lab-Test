import {
    SHOW_LOADER,
    HIDE_LOADER
} from './../constants/actionTypes';

import initialState from './../store/initialState';

const loader_reducer = (state = initialState.loader, action) => {
    switch (action.type) {
        case SHOW_LOADER:
            return Object.assign({
                requestInProgress: state.requestInProgress + 1
            })
        case HIDE_LOADER:
            return Object.assign({
                requestInProgress: state.requestInProgress - 1
            })
        default:
            return state;
    }
};

export default loader_reducer; 
