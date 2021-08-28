import * as api from './apiBook.js';

const host = "http://localhost:3030";
api.settings.host = host;
export const login = api.login;
export const register = api.register;
export const logout = api.logout;


export async function createBookDb(book) {
    return await api.post(host + '/data/books', book);
}

export async function getAllBooksFromDb() {
    return await api.get(host + '/data/books?sortBy=_createdOn%20desc');
}

export async function getSingleBookById(id) {
    return await api.get(host + '/data/books/' + id);
}

export async function deleteBookById(id) {
    return await api.del(host + '/data/books/' + id)
}

export async function editSingleBookById(id, book) {
    return await api.put(host + '/data/books/' + id, book);
}

export async function getAllUserBooksById(userId) {
    return await api.get(host + `/data/books?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function getLikes(bookId) {
    return await api.get(host + `/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`)
}

export async function postLikesInDb(id) {
    return await api.post(host + `/data/likes/`, id);
}

