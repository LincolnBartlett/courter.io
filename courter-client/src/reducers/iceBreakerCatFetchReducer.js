import { FETCH_IB_CAT } from '../actions/types';

export default function(state = null, action){

    switch (action.type){
        case FETCH_IB_CAT:
            return action.payload || false;
        default: 
            return state;
    }
}