import { authActions } from './index';
import { AsyncStorage } from "react-native";
import APIService from "../../../common/utils/api-service";


const login = (data) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        async function onRequest() { dispatch(authActions.loginRequest()) }
        async function onSuccess(response) {
            console.log('login response',response)
            AsyncStorage.setItem('token', response.data.access_token);
            APIService.addDefaultHeaders({ 'Authorization': response.data.access_token });
            dispatch(authActions.loginSuccess(response.data));
            resolve(response);
        }
        async function onError(error) {
            reject(error)
            dispatch(authActions.loginFailed(error));
        }
        onRequest();
        APIService.request({
            method: 'post', url: '/auth/login', data: data
        }).then(onSuccess).catch(onError);
    })
};

const signUp = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        async function onRequest() { dispatch(authActions.signUpRequest()) }
        async function onSuccess(response) {
            AsyncStorage.setItem('token', response.data.access_token);
            APIService.addDefaultHeaders({ 'Authorization': response.data.access_token });
            dispatch(authActions.signUpSuccess(response.data));
            resolve(response);
        }
        async function onError(error) {
            dispatch(authActions.signUpFailed(error));
        }
        onRequest();
        APIService.request({
            method: 'post', url: '/auth/signup', data: data
        }).then(onSuccess).catch(onError);
    })
};

const checkSession = ( ) => (dispatch) => {
    return new Promise( async(resolve, reject) => {
        let token = await AsyncStorage.getItem('token');
        console.log('token in check sesstion',token);
        async function onSuccess(response) {
            resolve(response);
        }
        async function onError(error) {
            reject(error)
        }
        APIService.request({
            method: 'get', url: '/auth/checkSession',data:null, headers:{ Authorization: token }
        }).then(onSuccess).catch(onError);
    })
};

const forgetPassword = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        async function onRequest() { dispatch(authActions.fetchingRequest()); }
        async function onSuccess(response) {
            dispatch(authActions.fetchingComplete());
            resolve(response);
        }
        async function onError(error) {
            dispatch(authActions.fetchingComplete(error));
        }
        onRequest();
        APIService.request({
            method: 'post', url: '/users/forgetPassword', data: data
        }).then(onSuccess).catch(onError);
    })
};

const verifyCode = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        async function onRequest() { dispatch(authActions.fetchingRequest()); }
        async function onSuccess(response) {
            dispatch(authActions.fetchingComplete());
            resolve(response);
        }
        async function onError(error) {
            dispatch(authActions.fetchingComplete(error));
        }
        onRequest();
        APIService.request({
            method: 'post', url: '/users/validateCode', data: data
        }).then(onSuccess).catch(onError);
    })
};

const resetPassword = (data) => (dispatch) => {
    return new Promise((resolve, reject) => {
        async function onRequest() { dispatch(authActions.fetchingRequest()); }
        async function onSuccess(response) {
            dispatch(authActions.fetchingComplete());
            resolve(response);
        }
        async function onError(error) {
            dispatch(authActions.fetchingComplete(error));
        }
        onRequest();
        APIService.request({
            method: 'post', url: '/users/resetPassword', data: data
        }).then(onSuccess).catch(onError);
    })
};

const getToken = () => (dispatch) => {
    return new Promise((resolve, reject) => {
        const token = AsyncStorage.getItem('token');
        if (token) {
            dispatch(authActions.saveToken(token));
            resolve(token)
        }
        reject(false)
    })
};



const unauthorize = () => (dispatch) => {
    return new Promise(() => {
        AsyncStorage.removeItem('token');
        dispatch(authActions.unauthorize());
    })
};

const logout = () => (dispatch) => {
    return new Promise((resolve) => {
        AsyncStorage.removeItem('token');
        dispatch(authActions.logout());
        resolve(true)
    })
};

export {
    login,
    signUp,
    forgetPassword,
    verifyCode,
    getToken,
    unauthorize,
    resetPassword,
    logout,
    checkSession
}