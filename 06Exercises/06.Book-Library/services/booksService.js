import {jsonRequest} from "../helpers/jsonRequest.js";

let baseUrl = 'http://localhost:3030';

async function getAllBooks() {
    let url = baseUrl + '/jsonstore/collections/books';
    return await jsonRequest(url);
}

async function getBook(id) {
    let url = baseUrl + `/jsonstore/collections/books/${id}`;
    return await jsonRequest(url);
}

async function createBook(book) {
    let url = baseUrl + '/jsonstore/collections/books';
    return await jsonRequest(url, 'Post', book);
}

async function editBook(id, book) {
    let url = baseUrl + `/jsonstore/collections/books/${id}`;
    return await jsonRequest(url, 'Put', book);
}

async function deleteBook(id) {
    let url = baseUrl + `/jsonstore/collections/books/${id}`;
    return await jsonRequest(url, 'Delete');
}


let booksService = {
    getAllBooks,
    getBook,
    createBook,
    editBook,
    deleteBook
}

export default booksService;