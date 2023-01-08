import jwtDecode from "jwt-decode";
import http from './httpService'
import config from '../config.json';

const apiEndpoint = config.apiUrl + '/auth';
const tokenKey = "token";

http.setJwt(getJwt());
// export a login function which takes two parameter email and password for login
export async function login(email, password){
    //  send http post request and pass apiEndpoint & in body pass a
    //  object which takes email and passsword and get the jwt token & store it localStorage
   const { data : jwt } = await http.post(apiEndpoint, {email, password});
   localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt){
    localStorage.setItem(tokenKey, jwt);
}

export function logout(){
    // remove the token from the local storage
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser(){
    try{
        // the getItem return a json web token
        const jwt = localStorage.getItem(tokenKey);
        // jwtDecode gives the current user
        return jwtDecode(jwt);   
      } catch(ex){
        return null;
      }
}

export function getJwt(){
    return localStorage.getItem(tokenKey);
}

export default {
    login,
    logout,
    getCurrentUser,
    loginWithJwt,
    getJwt
}