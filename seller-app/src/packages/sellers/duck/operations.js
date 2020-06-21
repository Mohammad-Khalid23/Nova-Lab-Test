import { sellerActions } from './index';
import { AsyncStorage } from "react-native";
import APIService from "../../../common/utils/api-service";


const fetchSellers = (sellerName) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        let token = await AsyncStorage.getItem('token');
        console.log('token in get list',token);
        async function onSuccess(response) {
            console.log('login response',response)
            dispatch(sellerActions.fetchSellerSuccess(response.data));
            resolve(response);
        }
        async function onError(error) {
            reject(error);
            dispatch(sellerActions.fetchSellerFailed(error));
        }
        APIService.request({
            method: 'get', url: '/seller?searchText=' + sellerName, data: null, headers:{ Authorization: token }
        }).then(onSuccess).catch(onError);
    })
};

const fetchTimeSlots = (sellerID) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        let token = await AsyncStorage.getItem('token');
        console.log('token in get list',token);
        async function onSuccess(response) {
            console.log('login response',response)
            dispatch(sellerActions.fetchSellerSuccess(response.data));
            resolve(response);
        }
        async function onError(error) {
            reject(error);
            dispatch(sellerActions.fetchSellerFailed(error));
        }
        APIService.request({
            method: 'get', url: `/seller/timeSlots/${sellerID}`, data: null,  headers:{ Authorization: token }
        }).then(onSuccess).catch(onError);
    })
};

const createBooking = (data) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        let token = await AsyncStorage.getItem('token');
        async function onSuccess(response) {
            dispatch(sellerActions.createBookingSuccess(response.data));
            resolve(response);
        }
        async function onError(error) {
            reject(error);
            dispatch(sellerActions.createBookingFailed(error));
        }
        APIService.request({
            method: 'post', url: '/booking/createBooking', data: data , 
            headers:{ Authorization: token }
        }).then(onSuccess).catch(onError);
    })
};


export {
    fetchSellers,
    createBooking,
    fetchTimeSlots
}