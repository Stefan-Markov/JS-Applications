import nav from "../pages/nav.js";
import viewSelector from "../viewSelector.js";

let baseUrl = `http://localhost:3030`;

async function register(userObj) {
    let res = await serverRequest(`${baseUrl}/users/register`, "post", userObj);
    localStorage.setItem("authToken", res.accessToken);
    localStorage.setItem("userId", res._id);
    localStorage.setItem("userName", res.email);
    nav.loginUser();
}

async function logIn(userObj) {
    let res = await serverRequest(`${baseUrl}/users/login`, "post", userObj);
    localStorage.setItem("authToken", res.accessToken);
    localStorage.setItem("userId", res._id);
    localStorage.setItem("userName", res.email);
    nav.loginUser();
}

async function logOut() {
    try {
        await serverRequest(`${baseUrl}/users/logout`, "get", undefined, true, true);
        localStorage.removeItem("authToken");
        localStorage.removeItem("userId");
        localStorage.removeItem("userName");
        nav.logoutUser();
        return viewSelector.redirectToPage("form-login");
    } catch (error) {
        alert(error);
    }
}

function clearStorage() {
    localStorage.clear();
}

function getAuthToken() {
    return localStorage.getItem("authToken");
}

function getUserName() {
    return localStorage.getItem("userName");
}

function getUserId() {
    return localStorage.getItem("userId");
}

function isLoggedIn() {
    return getAuthToken() !== null;
}

async function serverRequest(url, method = "get", body, isAuthorized, skipResult) {
    let headers = {};
    method = method.toLowerCase();

    if (["post", "put", "patch"].includes(method)) {
        headers["Content-Type"] = "application/json";
    }

    if (isAuthorized) {
        headers["X-Authorization"] = auth.getAuthToken();
    }

    if (body !== undefined) {
        body = JSON.stringify(body);
    }

    let res = await fetch(url, { headers, method, body });

    if (!res.ok) {
        let message = await res.text();
        // throw new Error(`${res.status}: ${message}`);
        throw new Error(message);
    }

    if (skipResult) {
        return res;
    }

    return await res.json();
}

let auth = {
    logIn,
    logOut,
    register,
    getAuthToken,
    getUserName,
    getUserId,
    isLoggedIn,
    clearStorage,
    serverRequest,
};

export default auth;