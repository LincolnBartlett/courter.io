import { FETCH_IB_CAT, FETCH_IB_ALL } from '../actions/types';

export default function(state = null, action){

    switch (action.type){
        case FETCH_IB_ALL:
            return action.payload || false;
        case FETCH_IB_CAT:
            return action.payload || false;
        default: 
            return state;
    }
}