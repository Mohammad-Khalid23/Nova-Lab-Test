import { combineReducers } from 'redux';

import authReducer from "../packages/auth/duck";
import sellerReducer from '../packages/sellers/duck';
import myBookingsReducer from '../packages/myBookings/duck';


const rootReducer = combineReducers({
    auth: authReducer,
    sellers: sellerReducer,
    myBookings: myBookingsReducer
});

export default rootReducer;