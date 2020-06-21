import { myBookingsActions } from './index';
import { AsyncStorage } from "react-native";
import APIService from "../../../common/utils/api-service";


const fetchMyBookings = (data) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        let token = await AsyncStorage.getItem('token');
        console.log('token in get list',token);
        async function onSuccess(response) {
            console.log('login response',response)
            dispatch(myBookingsActions.fetchMyBookingsSuccess(response.data));
            resolve(response);
        }
        async function onError(error) {
            reject(error);
            dispatch(myBookingsActions.fetchMyBookingsFailed(error));
        }
        APIService.request({
            method: 'get', url: '/booking/bookingRequest?searchby=buyer', data: null,
            headers:{ Authorization: token }
        }).then(onSuccess).catch(onError);
    })
};

const cancelBookingRequest = (buyerID,data) => (dispatch) => {
    return new Promise(async (resolve, reject) => {
        let token = await AsyncStorage.getItem('token');
        console.log('token in get list',token);
        async function onSuccess(response) {
            console.log('login response',response)
            dispatch(myBookingsActions.cancelBookingSuccess(response.data));
            resolve(response);
        }
        async function onError(error) {
            reject(error);
            dispatch(myBookingsActions.cancelBookingFailed(error));
        }
        APIService.request({
            method: 'get', url: `/booking/updateBookingStatus/${buyerID}`, data: data,
            headers:{ Authorization: token }
        }).then(onSuccess).catch(onError);
    })
};

export {
    fetchMyBookings,
    cancelBookingRequest
}