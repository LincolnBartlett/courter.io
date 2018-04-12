import {combineReducers} from 'redux';
import authReducer from './authReducer';
import chatReducer from './chatReducer';
import userListReducer from './userListReducer';
import chatListReducer from './chatListReducer';
import chatDataReducer from './chatDataReducer';
import startChatReducer from './startChatReducer';

export default combineReducers({
    auth: authReducer,
    chat: chatReducer,
    users: userListReducer,
    chatList: chatListReducer,
    chatData: chatDataReducer,
    startChat: startChatReducer
});