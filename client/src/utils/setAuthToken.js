import axios from "axios";

const setAuthToken = token => {
    //if token is in localStorgae then it will set the globalheader with that token
    if(token) {
        axios.defaults.headers.common['x-auth-token'] = token;
        localStorage.setItem('token', token);
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
        localStorage.removeItem('token');
    }
}

export default setAuthToken;