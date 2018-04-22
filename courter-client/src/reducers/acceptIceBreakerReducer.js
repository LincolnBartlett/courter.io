import { ACCEPT_ICE_BREAKER} from '../actions/types';

export default function(state = null, action){

    switch (action.type){
        case ACCEPT_ICE_BREAKER:
            return action.payload || false;
        default: 
            return state;
    }
}