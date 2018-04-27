import axios from "axios";
import {
  FETCH_USER,
  FETCH_CHAT,
  FETCH_ALL_USERS,
  FETCH_ONE_USER,
  FETCH_CHAT_LIST,
  SET_CHAT,
  START_CHAT,
  FETCH_CATEGORIES,
  FETCH_TOPICS,
  NEW_ICE_BREAKER,
  FETCH_IB_CAT,
  FETCH_IB_USER,
  SET_VIEW,
  REJECT_ICE_BREAKER,
  ACCEPT_ICE_BREAKER,
  FETCH_IB_ALL,
  SET_ALL_USER_IB_PREFS,
  SET_USER_LOCATION,
  SET_ALL_USER_INFO
} from "./types";

//NAVIGATION
export const setViewState = viewState => dispatch => {
  dispatch({ type: SET_VIEW, payload: viewState });
};

//USER
export const fetchUser = () => async dispatch => {
  const res = await axios.get("/api/user/current_user");
  dispatch({ type: FETCH_USER, payload: res.data });
};

export const fetchAllUsers = () => async dispatch => {
  const res = await axios.post("/api/user/all");
  dispatch({ type: FETCH_ALL_USERS, payload: res.data });
};

export const fetchOneUser = user_id => async dispatch => {
  const res = await axios.post("/api/user/one", { user_id: user_id });
  dispatch({ type: FETCH_ONE_USER, payload: res.data });
};

export const setDistanceAndAge = settingData => async dispatch => {
  const res = await axios.post("/api/user/setdistanceandage", settingData);
  dispatch({ type: SET_ALL_USER_IB_PREFS, payload: res.data });
};

export const setAllUserInfo = settingData => async dispatch => {
  const res = await axios.post("/api/user/setalluserinfo", settingData);
  dispatch({ type: SET_ALL_USER_INFO, payload: res.data });
};

export const setUserLocation = settingData => async dispatch => {
  const res = await axios.post("/api/user/setlocation", settingData);
  dispatch({ type: SET_USER_LOCATION, payload: res.data });
};

//CHAT
export const fetchChat = (chat_id = "") => async dispatch => {
  const res = await axios.post(`/api/chat/load/${chat_id}`);
  dispatch({ type: FETCH_CHAT, payload: res.data });
};

export const setChatData = (chat_id = "chat", givenName = "name",id  = "id") => dispatch => {
  dispatch({type: SET_CHAT, payload: { chat_id: chat_id, givenName: givenName, user_id: id }});
};

export const fetchChatList = user_id => async dispatch => {
  const res = await axios.post(`/api/chat/chatlist`, { user_id: user_id });
  dispatch({ type: FETCH_CHAT_LIST, payload: res.data });
};

export const startChat = message => async dispatch => {
  const res = await axios.post(`/api/chat/startchat`, message);
  dispatch({ type: START_CHAT, payload: res.data });
};

//ICE BREAKERS
export const fetchCategories = () => async dispatch => {
  const res = await axios.post(`/api/court/category/getall`);
  dispatch({ type: FETCH_CATEGORIES, payload: res.data });
};

export const fetchTopics = category_id => async dispatch => {
  const res = await axios.post(`/api/court/topic/get`, { category_id });
  dispatch({ type: FETCH_TOPICS, payload: res.data });
};

export const fetchIceBreakersByCat = (category_id,user_id) => async dispatch => {
  const res = await axios.post(`/api/court/icebreaker/getbycategory`, {
    category_id: category_id,
    user_id: user_id
  });
  dispatch({ type: FETCH_IB_CAT, payload: res.data });
};

export const fetchIceBreakersByUser = user_id => async dispatch => {
  const res = await axios.post(`/api/court/icebreaker/getbyuser`, {
    user_id: user_id
  });
  dispatch({ type: FETCH_IB_USER, payload: res.data });
};

export const fetchIceBreakersByAll = user_id => async dispatch => {
  const res = await axios.post(`/api/court/icebreaker/getall`, {
    user_id: user_id
  });
  dispatch({ type: FETCH_IB_ALL, payload: res.data });
};

export const newIceBreaker = icebreaker => async dispatch => {
  const res = await axios.post(`/api/court/icebreaker/new`, icebreaker);
  dispatch({ type: NEW_ICE_BREAKER, payload: res.data });
};

export const rejectIceBreaker = (user_id, ice_id) => async dispatch => {
  const res = await axios.post(`/api/court/icebreaker/reject`, {
    user_id: user_id,
    ice_id: ice_id
  });
  dispatch({ type: REJECT_ICE_BREAKER, payload: res.data });
};

export const acceptIceBreaker = (user_id, ice_id) => async dispatch => {
  const res = await axios.post(`/api/court/icebreaker/accept`, {
    user_id: user_id,
    ice_id: ice_id
  });
  dispatch({ type: ACCEPT_ICE_BREAKER, payload: res.data });
};
