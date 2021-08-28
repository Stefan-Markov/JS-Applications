import auth from "../services/authService.js";

let section = undefined;

export function initialize(domSection) {
    section = domSection;
    if (auth.isLoggedIn()) {
        this.loginUser();
    } else {
        this.logoutUser();
    }
}

export function logoutUser() {
 
}

export function loginUser() {
 
    
}

let nav = {
    initialize,
    loginUser,
    logoutUser
};

export default nav;