import { combineReducers } from 'redux';
import auth from './Auth';
import users from './Users';
import events from './Events';
import loader from './loader';
import emails from './emails';



export default combineReducers({
    auth,
    users,
    events,
    loader,
    emails

});
