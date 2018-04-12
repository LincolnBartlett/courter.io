import { START_CHAT } from '../actions/types';

export default function(state = null, action){

    switch (action.type){
        case START_CHAT:
            return action.payload || false;
        default: 
            return state;
    }
}