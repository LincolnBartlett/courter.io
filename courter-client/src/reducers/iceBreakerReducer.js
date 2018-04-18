import { NEW_ICE_BREAKER } from '../actions/types';

export default function(state = null, action){

    switch (action.type){
        case NEW_ICE_BREAKER:
            return action.payload || false;
        default: 
            return state;
    }
}