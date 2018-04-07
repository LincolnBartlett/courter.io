import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch =>{
      const res = await axios.get('/user/current_user');
      console.log('From fetchUser action creator:\n', res);
        dispatch({type: FETCH_USER, payload: res.data });
    };



// export const example = (argument) => async dispatch => {
//     const res = await axios.post('')
//     dispatch({type : EXAMPLE, payload : res.data});
// }