import { SET_USER_LOCATION} from '../actions/types';

export default function(state = null, action){

    switch (action.type){
        case SET_USER_LOCATION:
            return action.payload || false;
        default: 
            return state;
    }
}