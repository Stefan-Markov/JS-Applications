import {jsonRequest} from '../src/helpers/jsonRequest.js';

let baseUrl = 'http://localhost:3030/users';

function setUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

function getUser() {
    return localStorage.getItem('user') === null ? undefined :
        JSON.parse(localStorage.getItem('user'));
}

async function login(user) {
    let result = await jsonRequest(`${baseUrl}/login`, 'post', user);
    setUser(result);
}

async function register(user) {
    let result = jsonRequest(`${baseUrl}/register`, 'post', user);
    setUser(result);
}

async function logout(user) {
    await jsonRequest(`${baseUrl}/logout`, 'get', undefined, true, true);
}

export default {
    setUser,
    getUser,
    login,
    register,
    logout
}
