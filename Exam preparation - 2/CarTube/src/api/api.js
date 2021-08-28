export let settings = {
    host: "",
};

async function request(url, options) {
    try {
        const response = await fetch(url, options);

        if (response.ok === false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        try {
            const data = await response.json();
            return data;
        } catch (err) {
            return response;
        }
    } catch (err) {
        alert(err.message)
        throw err;
    }


}

export async function login(email, password) {
    const reply = await post(settings.host + '/users/login', {email, password});
    sessionStorage.setItem("username", reply.username);
    sessionStorage.setItem("userId", reply._id);
    // sessionStorage.setItem("email", reply.email);
    sessionStorage.setItem("authToken", reply.accessToken);
    // sessionStorage.setItem("userGender", reply.gender);
    return reply;
}

export async function register(username,password) {
    const reply = await post(settings.host + '/users/register', {username,password});
    sessionStorage.setItem("username", reply.username);
    sessionStorage.setItem("userId", reply._id);
    // sessionStorage.setItem("email", reply.email);
    sessionStorage.setItem("authToken", reply.accessToken);
    // sessionStorage.setItem("userGender", reply.gender);
    return reply;
}

export async function logout() {
    const reply = await get(settings.host + '/users/logout');
    sessionStorage.removeItem("username");
    // sessionStorage.removeItem("email");
    sessionStorage.removeItem("authToken");
    sessionStorage.removeItem("userId");
    // sessionStorage.removeItem("userGender");
    return reply;
}

function getOptions(method = "get", body) {
    const options = {method, headers: {}};

    let token = sessionStorage.getItem("authToken");
    if (token !== null) {
        options.headers["X-Authorization"] = token;
    }

    if (body) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }
    return options;
}


export async function get(url) {
    return await request(url, getOptions());
}


export async function post(url, data) {
    return await request(url, getOptions("post", data));
}


export async function put(url, data) {
    return await request(url, getOptions("put", data));
}


export async function del(url) {
    return await request(url, getOptions("delete"));
}




// import {clearUserData, getUserData, setUserData} from "../utility.js";
//
// export const settings = {
//     host: ''
// }
//
// async function request(url, options) {
//     try {
//         const response = await fetch(url, options);
//
//         if (response.ok === false) {
//             const error = await response.json();
//             throw  new Error(error.message);
//         }
//         try {
//             return request.json();
//         } catch (err) {
//             return response;
//         }
//     } catch (error) {
//         alert(error.message);
//         throw error;
//     }
// }
//
// function createOptions(method = 'get', body) {
//     const options = {method, headers: {}};
//
//     const user = getUserData();
//
//     if (user) {
//         options.headers['X-Authorization'] = user.accessToken;
//     }
//
//     if (body) {
//         options.headers['Content-Type'] = 'application/json';
//         options.body = JSON.stringify(body);
//     }
//     return options;
// }
//
// export async function get(url) {
//     return await request(url, createOptions());
// }
//
// export async function post(url, data) {
//     return await request(url, createOptions('post', data));
// }
//
// export async function put(url, data) {
//     return await request(url, createOptions('put', data));
// }
//
// export async function del(url) {
//     return await request(url, createOptions('delete'));
// }
//
// export async function login(username, password) {
//     const user = await post(settings.host + '/users/login', {username, password});
//     setUserData(user);
//     return user;
// }
//
//
// export async function register(username, password) {
//     const result = await post(settings.host + '/users/register', {username, password});
//     setUserData(result);
//     return result;
// }
//
// export function logout() {
//     const result = get(settings.host + '/users/logout');
//     clearUserData();
//     return result;
// }