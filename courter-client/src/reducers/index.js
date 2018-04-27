import {combineReducers} from 'redux';
import authReducer from './authReducer';
import chatReducer from './chatReducer';
import userListReducer from './userListReducer';
import chatListReducer from './chatListReducer';
import chatDataReducer from './chatDataReducer';
import startChatReducer from './startChatReducer';
import categoryReducer from './categoryReducer';
import topicReducer from './topicReducer';
import iceBreakerReducer from './iceBreakerReducer';
import iceBreakerCatFetchReducer from './iceBreakerCatFetchReducer';
import viewReducer from './viewReducer';
import rejectIceBreaker from './rejectIceBreakerReducer';
import acceptIceBreaker from './acceptIceBreakerReducer';
import iceBreakerUserFetchReducer from './iceBreakerUserFetchReducer';
import fetchOneUserReducer from './fetchOneUserReducer';
import {reducer as geolocation} from 'react-redux-geolocation';
import setUserIBPrefsReducer from './setUserIBPrefsReducer';
import setUserLocationReducer from './setUserLocationReducer';
import setAllUserInfoReducer from './setAllUserInfoReducer';

export default combineReducers({
    auth: authReducer,
    chat: chatReducer,
    users: userListReducer,
    chatList: chatListReducer,
    chatData: chatDataReducer,
    startChat: startChatReducer,
    categories: categoryReducer,
    topics: topicReducer,
    icebreaker: iceBreakerReducer,
    icebreakers: iceBreakerCatFetchReducer,
    usericebreakers: iceBreakerUserFetchReducer,
    viewState : viewReducer,
    rejectIceBreaker : rejectIceBreaker,
    acceptIceBreaker : acceptIceBreaker,
    profileuser: fetchOneUserReducer,
    geolocation,
    setDistanceAndAge: setUserIBPrefsReducer,
    setUserLocation: setUserLocationReducer,
    setAllUserInfo: setAllUserInfoReducer
});