export const settings = {
    baseUrl: "",
};

export async function login(email, password) {
    const reply = await post(`${settings.baseUrl}/users/login`, {email, password});
    localStorage.setItem("username", reply.username);
    localStorage.setItem("email", reply.email);
    localStorage.setItem("userToken", reply.accessToken);
    localStorage.setItem("userId", reply._id);
    return reply;
}

export async function register(username, email, password) {
    const reply = await post(`${settings.baseUrl}/users/register`, {username, email, password});
    localStorage.setItem("username", reply.username);
    localStorage.setItem("email", reply.email);
    localStorage.setItem("userToken", reply.accessToken);
    localStorage.setItem("userId", reply._id);
    return reply;
}

export async function logout() {
    const reply = await get(`${settings.baseUrl}/users/logout`);
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("userToken");
    localStorage.removeItem("userId");
    return reply;
}

async function askServer(url, options) {
    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            let msg = await response.json();
            throw new Error(msg.message);
        }

        let data = await response.json().catch((e) => response);
        // console.log(data);
        return data;
    } catch (err) {
        throw err;
    }
}

function getOptions(method = "get", body) {
    const options = {
        method: method.toLowerCase(),
        headers: {},
    };

    if (localStorage.getItem("userToken") !== null) {
        options.headers["X-Authorization"] = localStorage.getItem("userToken");
    }

    if (body) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(body);
    }

    return options;
}

export async function get(url) {
    return await askServer(url, getOptions());
}

export async function post(url, data) {
    return await askServer(url, getOptions("post", data));
}

export async function put(url, data) {
    return await askServer(url, getOptions("put", data));
}

export async function del(url) {
    return await askServer(url, getOptions("delete"));
}