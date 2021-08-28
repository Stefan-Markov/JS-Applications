
import nav from "../pages/nav.js";
import viewFinder from "../viewFinder.js";


export function setAuthToken(token) {
    localStorage.setItem('authToken', token);
}

export function getAuthToken() {
    return localStorage.getItem('authToken');
}

export function getUserId() {
    return localStorage.getItem('userId');
}

export function setUserId(userId) {
    localStorage.setItem('userId', userId);
}

export function isLoggedIn() {
    return localStorage.getItem('authToken') !== null;
}


export function logout(user) {
   
       let url =  'http://localhost:3030/users/logout';

       fetch(url,{
           method: 'Get',
           headers: {
            'X-Authorization': getAuthToken(user)
           }
       })

    localStorage.clear();

    nav.logoutUser();
    viewFinder.navigateTo('login');
}

export function login(user) {

    let url = 'http://localhost:3030/users/login';

    fetch(url, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(user => {
            
            setAuthToken(user.accessToken);
            setUserId(user._id);
            setUsername(user.email);
        })
        .catch(err => {
            console.error('Error');
        });

    nav.loginUser();
    viewFinder.navigateTo('home');
}

export function register(user) {
    
    let url = 'http://localhost:3030/users/register';

    fetch(url, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(user => {

            setAuthToken(user.accessToken);
            setUserId(user._id);
            setUsername(user.email);
        })
        .catch(err => {
            console.error('Error');
        });

    nav.loginUser();
    viewFinder.navigateTo('home');
}

export function getUsername() {
    return localStorage.getItem('username');
}

export function setUsername(userId) {
    localStorage.setItem('username', userId);
}

let auth = {
    setAuthToken,
    getAuthToken,
    isLoggedIn,
    logout,
    setUserId,
    getUserId,
    setUsername,
    getUsername,
    login,
    register
};

export default auth;