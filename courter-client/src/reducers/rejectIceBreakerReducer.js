import { REJECT_ICE_BREAKER} from '../actions/types';

export default function(state = null, action){

    switch (action.type){
        case REJECT_ICE_BREAKER:
            return action.payload || false;
        default: 
            return state;
    }
}