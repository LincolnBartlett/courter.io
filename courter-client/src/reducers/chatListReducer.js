import { FETCH_CHAT_LIST, START_CHAT } from '../actions/types';

export default function(state = null, action){

    switch (action.type){
        case START_CHAT:
        return action.payload || false;
        case FETCH_CHAT_LIST:
            return action.payload || false;
        default: 
            return state;
    }
}