import axios from 'axios';
import { FETCH_USER, FETCH_CHAT, FETCH_ALL_USERS, FETCH_CHAT_LIST, SET_CHAT } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/user/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchChat = (chat_id = '') => async dispatch => {
    const res = await axios.post(`/api/chat/load/${chat_id}`);
    dispatch({ type: FETCH_CHAT, payload: res.data });
};

export const setChatData = (chat_id = 'chat') => dispatch => {
    dispatch({ type: SET_CHAT, payload: chat_id });
};

export const fetchChatList = (user_id = '') => async dispatch => {
    const res = await axios.post(`/api/chat/chatlist/${user_id}`);
    dispatch({ type: FETCH_CHAT_LIST, payload: res.data });
};

export const fetchAllUsers = () => async dispatch => {
    const res = await axios.post('/api/user/all');
    dispatch({ type: FETCH_ALL_USERS, payload: res.data });
};
// export const example = (argument) => async dispatch => {
//     const res = await axios.post('')
//     dispatch({type : EXAMPLE, payload : res.data});
// }