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
    viewState : viewReducer,
    rejectIceBreaker : rejectIceBreaker,
    acceptIceBreaker : acceptIceBreaker
});