import authService from "./authService.js";

let baseUrl = "http://localhost:3030/data/catalog";

async function getAll() {
  let response = await fetch(baseUrl);
  let result = await response.json();
  return result;
}

async function get(id) {
  let url = `${baseUrl}/${id}`;
  console.log(url);
  let response = await fetch(`${baseUrl}/${id}`);
  let result = await response.json();
  return result;
}

async function create(item) {
  let response = await fetch(`${baseUrl}`, {
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": authService.getAuthToken(),
    },
    method: "Post",
    body: JSON.stringify(item),
  });

  let result = await response.json();
  return result;
}

async function update(item, id) {
  let response = await fetch(`${baseUrl}/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "Put",
    body: JSON.stringify(item),
  });

  let result = await response.json();
  return result;
}

async function deleteItem(id) {
  console.log(`${baseUrl}/${id}`);
  let response = await fetch(`${baseUrl}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": authService.getAuthToken(),
    },
    method: "Delete",
  });
  return response;
}

export default {
  getAll,
  get,
  create,
  update,
  deleteItem,
};
