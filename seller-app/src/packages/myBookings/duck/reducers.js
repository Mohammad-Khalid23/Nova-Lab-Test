import * as types from "./types";

let initialState = {
    myBookings: null,
    isFetching: false
};

const myBookingsReducer = (state = initialState, action) => {
    switch (action.type) {

        case types.FETCH_MY_BOOKINGS_SUCCESS:
            return { ...state, myBookings: action.payload, isFetching: false };

        case types.FETCH_MY_BOOKINGS_FAILED:
            return { ...state, isFetching: false };

        case types.CANCEL_BOOKING_SUCCESS:
            let updatedMyBookings = state.myBookings.map((booking) => {
                if (booking._id === action.payload._id) {
                    console.log('matched booking', booking);
                    return {
                        ...booking,
                        status: action.payload.status
                    }
                } else {
                    return booking;
                }
            })
            console.log('updated booking list',updatedMyBookings)
            return { ...state,
                    myBookings: updatedMyBookings,
                    isFetching: false
                 };

        case types.CANCEL_BOOKING_FAILED:
            return { ...state, isFetching: false };

        default: return state
    }
}

export default myBookingsReducer;