import { HTTP } from '../utils/HTTP';

import {
    SHOW_LOADER,
    HIDE_LOADER,

} from './../constants/actionTypes';

export function updateBookingStatus(data) {
    console.log(data, "Booking ID +++++++++++")
    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            let token = localStorage.getItem('token');
            HTTP('put', 'booking/updateBookingStatus/' + data._id, data, { Authorization: token })
                .then(function (response) {
                    console.log("response in  event detail ==>>", response)
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("error in  event detail", error)
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

export function getBookingRequest() {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            let token = localStorage.getItem('token');
            HTTP('get', `booking/bookingRequest?searchby=seller`, null, { Authorization: token })
                .then(function (response) {
                    console.log("response in  bookikng request", response)
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("error in  booking request", error)
                    reject(error);
                    dispatch({
                        type: HIDE_LOADER,
                    });
                })
                .finally(() => {
                    dispatch({
                        type: HIDE_LOADER,
                    });
                })
        });
    };
}

export function addTimeSlot(data) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            let token = localStorage.getItem('token');
            console.log('data before send',data);
            HTTP('post', `seller/timeSlot`, data, { Authorization: token })
                .then(function (response) {
                    console.log("response time slots", response)
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("error in  event", error)
                    reject(error);
                    dispatch({
                        type: HIDE_LOADER,
                    });
                })
                .finally(() => {
                    dispatch({
                        type: HIDE_LOADER,
                    });
                })
        });
    };
}

export function getTimeSlots(userID) {

    return function (dispatch) {
        return new Promise(async function (resolve, reject) {
            dispatch({
                type: SHOW_LOADER,
            });
            let token = localStorage.getItem('token');
            console.log('user ID -----------',userID)
            HTTP('get', `seller/timeSlots/${userID}`, null, { Authorization: token })
                .then(function (response) {
                    console.log("response in  event ==>>", response)
                    resolve(response.data);
                })
                .catch(error => {
                    console.log("error in  event", error)
                    reject(error);
                    dispatch({
                        type: HIDE_LOADER,
                    });
                })
                .finally(() => {
                    dispatch({
                        type: HIDE_LOADER,
                    });
                })
        });
    };
}