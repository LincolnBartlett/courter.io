import axios from 'axios';
import { FETCH_USER, FETCH_CHAT } from './types';

export const fetchUser = () => async dispatch =>{
      const res = await axios.get('/user/current_user');
      console.log('From fetchUser action creator:\n', res);
        dispatch({type: FETCH_USER, payload: res.data });
    };

export const fetchChat = () => async dispatch =>{
    const res = await axios.post('/chat/load');
    console.log('From chatUser action creator:\n', res);
        dispatch({type: FETCH_CHAT, payload: res.data });
    };

// export const example = (argument) => async dispatch => {
//     const res = await axios.post('')
//     dispatch({type : EXAMPLE, payload : res.data});
// }