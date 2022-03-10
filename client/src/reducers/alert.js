import {SET_ALERT , REMOVE_ALERT} from '../actions/types';

const initialState = [
    // {
    //     id: 1,
    //     msg: 'Please Log In',
    //     alertType: 'success'
    // }
];

export default function(state = initialState ,action) {
    const {type,payload} = action;
    //depending on type,we need to decide what we want to send down as far as state
    switch(type) {
        case SET_ALERT: 
          return [...state,payload];
        case REMOVE_ALERT:
          return state.filter(alert => alert.id !== payload);
        default:
          return state;
    }
}