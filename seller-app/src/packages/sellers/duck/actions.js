import * as types from "./types";

export const fetchSellerRequest = () => ({
    type: types.FETCH_SELLERS_REQUEST,
});

export const fetchSellerSuccess = (data) => ({
    type: types.FETCH_SELLERS_SUCCESS,
    payload: data
});

export const fetchSellerFailed = (err) => ({
    type: types.FETCH_SELLERS_FAILED,
    payload: err
});

export const createBookingRequest = () => ({
    type: types.CREATE_BOOKING_REQUEST,
})

export const createBookingSuccess = (data) => ({
    type: types.CREATE_BOOKING_SUCCESS,
    payload: data
});

export const createBookingFailed = (err) => ({
    type: types.CREATE_BOOKING_FAILED,
    payload: err
});