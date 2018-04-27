import { SET_ALL_USER_INFO} from '../actions/types';

export default function(state = null, action){

    switch (action.type){
        case SET_ALL_USER_INFO:
            return action.payload || false;
        default: 
            return state;
    }
}