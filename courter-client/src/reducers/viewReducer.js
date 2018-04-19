import { SET_VIEW } from '../actions/types';

export default function(state = null, action){

    switch (action.type){
        case SET_VIEW:
            return action.payload || false;
        default: 
            return state;
    }
}