import { GET_PROFILE,PROFILE_ERROR } from "../actions/types";

const initialState = {
    profile: null,
    profiles:[],     //profile listing page {list of developers}
    repos: [],     // for when we fetch github repos that will go here
    loading: true,
    error : {}     //error objecct for any errors in the request
} 

export default function(state = initialState ,action) {
    const {type ,payload} =action;

    switch(type) {
      case GET_PROFILE:
        return {
            ...state,
            profile: payload,
            loading: false
        };
      case PROFILE_ERROR:
        return {
            ...state,
            error: payload,
            loading: false
        };
      default:
        return state;
    }


}