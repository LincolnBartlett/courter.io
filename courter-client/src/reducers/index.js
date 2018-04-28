import {combineReducers} from 'redux';
import authReducer from './authReducer';
import chatReducer from './chatReducer';
import userListReducer from './userListReducer';
import chatListReducer from './chatListReducer';
import chatDataReducer from './chatDataReducer';
import categoryReducer from './categoryReducer';
import topicReducer from './topicReducer';
import iceBreakerReducer from './iceBreakerReducer';
import viewReducer from './viewReducer';
import iceBreakerUserReducer from './iceBreakerUserReducer';
import profileUserReducer from './profileUserReducer';
import {reducer as geolocation} from 'react-redux-geolocation';



export default combineReducers({
    auth: authReducer,
    chat: chatReducer,
    users: userListReducer,
    chatList: chatListReducer,
    chatData: chatDataReducer, 
    categories: categoryReducer,
    topics: topicReducer,
    icebreakers: iceBreakerReducer,
    usericebreakers: iceBreakerUserReducer,
    viewState : viewReducer,
    profileuser: profileUserReducer,
    geolocation
});