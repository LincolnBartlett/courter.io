import { FETCH_ONE_USER } from '../actions/types';

export default function(state = null, action){

    switch (action.type){
        case FETCH_ONE_USER:
            return action.payload || false;
        default: 
            return state;
    }
}