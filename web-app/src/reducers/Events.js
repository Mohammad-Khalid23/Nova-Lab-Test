import {
  // LOGIN_SUCCESS,
  // LOGIN_FAILED,
  // LOGOUT_SUCCESS,
  // GET_ME_FAIL,
  // GET_ME_REQUEST,
  // // GET_ME_SUCCESS
} from './../constants/actionTypes';

import initialState from './../store/initialState';

const event_reducer = (state = initialState.events, action) => {
  switch (action.type) {
    // case LOGIN_SUCCESS:
    // console.log("action =++>",action)
    //   localStorage.setItem('access_token', action.data.access_token);
    //   return Object.assign(
    //     {},
    //     ...state,
    //     { user: action.data }
    //   );
    // case LOGIN_FAILED:
    //   return Object.assign(
    //     {},
    //     ...state,
    //     { user: null }
    //   );
    // case LOGOUT_SUCCESS:
    //   localStorage.removeItem('access_token')
    //   return Object.assign(
    //     {},
    //     ...state,
    //     { user: null }
    //   );
    // case GET_ME_SUCCESS:
    // return Object.assign(
    //   {},
    //   ...state,
    //   { user: action.data }
    // );
    // case GET_ME_REQUEST:
    //   return state;


    default:
      return state;
  }
};

export default event_reducer;