import axios from 'axios';
import { 
    FETCH_USER, 
    FETCH_CHAT, 
    FETCH_ALL_USERS, 
    FETCH_CHAT_LIST, 
    SET_CHAT, 
    START_CHAT, 
    FETCH_CATEGORIES, 
    FETCH_TOPICS, 
    NEW_ICE_BREAKER,
    FETCH_IB_CAT 
        } from './types';

export const fetchUser = () => async dispatch => {
    const res = await axios.get('/api/user/current_user');
    dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchChat = (chat_id = '') => async dispatch => {
    const res = await axios.post(`/api/chat/load/${chat_id}`);
    dispatch({ type: FETCH_CHAT, payload: res.data });
};

export const setChatData = (chat_id = 'chat', givenName = 'name') => dispatch => {
    dispatch({ type: SET_CHAT, payload: {chat_id : chat_id, givenName : givenName}});
};

export const fetchChatList = (user_id = '') => async dispatch => {
    const res = await axios.post(`/api/chat/chatlist/${user_id}`);
    dispatch({ type: FETCH_CHAT_LIST, payload: res.data });
};

export const fetchAllUsers = () => async dispatch => {
    const res = await axios.post('/api/user/all');
    dispatch({ type: FETCH_ALL_USERS, payload: res.data });
};

export const startChat = (message) => async dispatch => {
    const res = await axios.post(`/api/chat/startchat`,message);
    dispatch({ type: START_CHAT, payload: res.data });
};

export const fetchCategories = () => async dispatch => {
    const res = await axios.post(`/api/court/category/getall`);
    dispatch({ type: FETCH_CATEGORIES, payload: res.data });
};

export const fetchTopics = (category_id = "5ad518960f536e5d7170edcb") => async dispatch => {
    const res = await axios.post(`/api/court/topic/get`,{category_id});
    dispatch({ type: FETCH_TOPICS, payload: res.data });
};

export const fetchIceBreakersByCat = (category_id) => async dispatch => {
    const res = await axios.post(`/api/court/icebreaker/getbycategory`, {category_id: category_id});
    dispatch({ type: FETCH_IB_CAT, payload: res.data });
};

export const newIceBreaker = (icebreaker) => async dispatch => {
    const res = await axios.post(`/api/court/icebreaker/new`, icebreaker);
    dispatch({ type: NEW_ICE_BREAKER, payload: res.data });
};

// export const example = (argument) => async dispatch => {
//     const res = await axios.post('')
//     dispatch({type : EXAMPLE, payload : res.data});
// }