import {combineReducers} from 'redux';
import authReducer from './authReducer';
import chatReducer from './chatReducer';
import userListReducer from './userListReducer';

export default combineReducers({
    auth: authReducer,
    chat: chatReducer,
    users: userListReducer
});