//types.js to hold all our variables or all of our constants
// the reason for it , if we want to change the string 'SET_ALERT' we can change it here only 
// it will store it in varible named SET_ALERT which we will be using in other files
// also it gives centralised file of all our type / can see our action types here at one place to see
export const SET_ALERT = 'SET_ALERT';
export const REMOVE_ALERT = 'REMOVE_ALERT';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAIL = 'REGISTER_FAIL';
export const USER_LOADED = 'USER_LOADED';
export const AUTH_ERROR = 'AUTH_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAIL = 'LOGIN_FAIL';
export const LOGOUT = 'LOGOUT';
export const GET_PROFILE = 'GET_PROFILE';
export const GET_PROFILES = 'GET_PROFILES';
export const GET_REPOS = 'GET_REPOS';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const CLEAR_PROFILE = 'CLEAR_PROFILE'; // WHEN USER LOGOUT THEMSELVES , CLEAR THEIR PROFILE 
export const PROFILE_ERROR = 'PROFILE_ERROR';
export const ACCOUNT_DELETED = 'ACCOUNT_DELETED';
export const GET_POSTS = 'GET_POSTS';
export const GET_POST = 'GET_POST';
export const POST_ERROR = 'POST_ERROR';
export const UPDATES_LIKES = 'UPDATES_LIKES';
export const DELETE_POST = 'DELETE_POST';
export const ADD_POST = 'ADD_POST';
export const ADD_COMMENT = 'ADD_COMMENT';
export const REMOVE_COMMENT = 'REMOVE_COMMENT';

