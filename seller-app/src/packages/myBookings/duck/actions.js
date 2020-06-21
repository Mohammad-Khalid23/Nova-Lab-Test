import * as types from "./types";

export const fetchBookingsRequest = () => ({
    type: types.FETCH_BOOKINGS_REQUEST,
});

export const fetchMyBookingsSuccess = (data) => ({
    type: types.FETCH_MY_BOOKINGS_SUCCESS,
    payload: data
});

export const fetchMyBookingsFailed = (err) => ({
    type: types.FETCH_MY_BOOKINGS_FAILED,
    payload: err
});

export const cancelBookingSuccess = (data) => ({
    type: types.CANCEL_BOOKING_SUCCESS,
    payload: data
});

export const cancelBookingFailed = (err) => ({
    type: types.CANCEL_BOOKING_FAILED,
    payload: err
});