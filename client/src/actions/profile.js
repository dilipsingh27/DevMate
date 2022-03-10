
import axios from "axios";
import api from '../utils/api';
import {setAlert} from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR
} from './types';

//Get current users profile
export const getCurrentProfile = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }

    const body = JSON.stringify();
    try {
        const res= await axios.get('/api/profile/me' , body ,config);
        // const res= await api.get('/profile/me');

        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText , status: err.response.status}
        });
    }
}



