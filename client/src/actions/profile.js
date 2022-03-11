import axios from "axios";
import api from '../utils/api';
import {setAlert} from './alert';

import {
    CLEAR_PROFILE,
    ACCOUNT_DELETED,
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_ERROR,
    UPDATE_PROFILE,
    GET_REPOS
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
        // const res= await api.get('/api/profile/me');

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

//Get All Profiles
export const getProfiles = () => async dispatch => {
    dispatch({type: CLEAR_PROFILE});
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }

    // const body = JSON.stringify();
    
    try {
        const res= await axios.get('/api/profile');
        // const res= await api.get('/api/profile/me');

        dispatch({
            type: GET_PROFILES,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText , status: err.response.status}
        });
    }
}



//Get Profiles By ID
export const getProfileById = userId => async dispatch => {
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }

    // const body = JSON.stringify();
    
    try {
        const res= await axios.get(`/api/profile/user/${userId}`);
        // const res= await api.get('/api/profile/me');

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



//Get Github repos
export const getGitHubRepos = username => async dispatch => {
    
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }

    // const body = JSON.stringify();
    
    try {
        const res= await axios.get(`/api/profile/github/${username}`);
        // const res= await api.get('/api/profile/me');

        dispatch({
            type: GET_REPOS,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText , status: err.response.status}
        });
    }
}

//Create or update profile
export const createProfile = (formData, navigate, edit= false) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // const body = JSON.stringify();
        const res = await axios.post('/api/profile',formData,config);
        
        dispatch({
            type: GET_PROFILE,
            payload: res.data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created','success'));

        if(!edit) {
            navigate('/dashboard');
        }
    } catch (err) {
        err.response?.data?.errors?.forEach(
            error => dispatch(setAlert(error.msg, 'danger'))
        );

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText , status: err.response.status}
        });
    }
}

//Add Experience 
export const addExperience = (formData,history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // const body = JSON.stringify();
        const res = await axios.put('/api/profile/experience ',formData,config);
        
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Added','success'));

        history.push('/dashboard');
        // if(!edit) {
        //     navigate('/dashboard');
        // }
    } catch (err) {
        err.response?.data?.errors?.forEach(
            error => dispatch(setAlert(error.msg, 'danger'))
        );

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText , status: err.response.status}
        });
    }
}

//Add Education
export const addEducation = (formData,history) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // const body = JSON.stringify();
        const res = await axios.put('/api/profile/education ',formData,config);
        
        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Added','success'));

        history.push('/dashboard');
        // if(!edit) {
        //     navigate('/dashboard');
        // }
    } catch (err) {
        err.response?.data?.errors?.forEach(
            error => dispatch(setAlert(error.msg, 'danger'))
        );

        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText , status: err.response.status}
        });
    }
}

//Delete an Experience
export const deleteExperience = id => async dispatch => {
    // console.log("1111111111");
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json'
    //     }
    // }

    // const body = JSON.stringify();
    try {
        const res = await axios.delete(`/api/profile/experience/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Experience Removed','success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText , status: err.response.status}
        });
    }
};


//Delete Education
export const deleteEducation = id => async dispatch => {
    try {
        const res = await axios.delete(`/api/profile/education/${id}`);

        dispatch({
            type: UPDATE_PROFILE,
            payload: res.data
        });

        dispatch(setAlert('Education Removed','success'));
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: {msg: err.response.statusText , status: err.response.status}
        });
    }
};

//Delete Account & Profile
export const deleteAccount = () => async dispatch => {
    if(window.confirm('Are You Sure? This can NOT be undone!!!')) {
        try {
            const res = await axios.delete('/api/profile');
    
            dispatch({type: CLEAR_PROFILE});
            dispatch({type: ACCOUNT_DELETED});

            dispatch(setAlert('Your ACCOUNT has been PERMANENTLY DELETED'));
        } catch (err) {
            dispatch({
                type: PROFILE_ERROR,
                payload: {msg: err.response.statusText , status: err.response.status}
            });
        }
    }
    
};

// import api from '../utils/api';
// import { setAlert } from './alert';

// import {
//   GET_PROFILE,
//   GET_PROFILES,
//   PROFILE_ERROR,
//   UPDATE_PROFILE,
//   CLEAR_PROFILE,
//   ACCOUNT_DELETED,
//   GET_REPOS,
//   NO_REPOS
// } from './types';

// /*
//   NOTE: we don't need a config object for axios as the
//  default headers in axios are already Content-Type: application/json
//  also axios stringifies and parses JSON for you, so no need for 
//  JSON.stringify or JSON.parse
// */

// // Get current users profile
// export const getCurrentProfile = () => async (dispatch) => {
//   try {
//     console.log("1111111111111111111111111");
//     const body = JSON.stringify();
//     const res = await api.get('/profile/me',body);
//     console.log(res);
//     dispatch({
//       type: GET_PROFILE,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };