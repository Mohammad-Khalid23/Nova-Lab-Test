import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  GET_ME_FAILED,
  GET_ME_SUCCESS
} from './../constants/actionTypes';

import initialState from './../store/initialState';

const auth_reducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      console.log("action =++>", action)
      localStorage.setItem('token', action.data.token);
      return Object.assign(
        {},
        ...state,
        { user: action.data }
      );
    case LOGIN_FAILED:
      return Object.assign(
        {},
        ...state,
        { user: null }
      );
    case LOGOUT_SUCCESS:
      localStorage.removeItem('token')
      return Object.assign(
        {},
        ...state,
        { user: null }
      );
    case GET_ME_SUCCESS:
      return Object.assign(
        {},
        ...state,
        { user: action.data }
      );
    case GET_ME_FAILED:
      localStorage.removeItem('token')
      return Object.assign(
        {},
        ...state,
        { user: null }
      );

    default:
      return state;
  }
};

export default auth_reducer;