/*
* Action for feature todos
* */

import { HTTP } from './../utils/HTTP';

import {
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCESS,
  SHOW_LOADER,
  HIDE_LOADER,
  GET_ME_SUCCESS,
  GET_ME_FAILED
} from './../constants/actionTypes';


export function getMe(token) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      dispatch({
        type: SHOW_LOADER,
      });
      if (token) {
        HTTP('get', 'auth/checkSession', null, { Authorization: token })
          .then(function (response) {
            console.log("ME RESPONSE =>>>", response)
            dispatch({
              type: GET_ME_SUCCESS,
              data: response.data.data
            });
            resolve(response.data);
          })
          .catch(error => {
            console.log("ME RESPONSE =>>>", error)
            dispatch({
              type: GET_ME_FAILED,
            });
            reject(error);
          })
          .finally(() => {
            dispatch({
              type: HIDE_LOADER,
            });
          })
      } else {
        dispatch({
          type: LOGOUT_SUCCESS,
        });
      }
    });
  };
}


export function login(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      dispatch({
        type: SHOW_LOADER,
      });
      HTTP('post', 'auth/login', data)
        .then(function (response) {
          console.log("LOGIN ADMIN RESPONSE =>>>", response);
          dispatch({
            type: LOGIN_SUCCESS,
            data: response.data.data
          });
          resolve(response.data);
        })
        .catch(error => {
          console.log("LOGIN ADMIN RESPONSE =>>>", error)
          dispatch({
            type: LOGIN_FAILED,
          });
          reject(error);
        })
        .finally(() => {
          dispatch({
            type: HIDE_LOADER,
          });
        })
    });
  };
}

export function logout(data) {
  return function (dispatch) {
    return new Promise(function (resolve, reject) {
      dispatch({
        type: LOGOUT_SUCCESS,
      });
    });
  };
}

