import {jsonRequest} from '../src/helpers/jsonRequest.js';

let baseUrl = 'http://localhost:3030/data/memes';

async function getAll() {
    let result = await jsonRequest(baseUrl);
    return result;
}

async function get(id) {
    return await jsonRequest(`${baseUrl}/${id}`)
}

async function create(item) {
    let result = await jsonRequest(`${baseUrl}`, 'post', item, true);
    return result;
}

