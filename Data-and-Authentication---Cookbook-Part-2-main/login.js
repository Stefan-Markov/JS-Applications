const formElement = document.querySelector('form');
let registerUrl = `http://localhost:3030/users/login`;
formElement.addEventListener('submit', onLoginSubmit);

async function onLoginSubmit(event) {
event.preventDefault();

const formData = new FormData(event.target);
let email = formData.get(`email`);
let password = formData.get(`password`);

if (email == "" || password == "") {
    return alert(`All fields are requred`);
}

const response = await fetch(registerUrl, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        email,
        password
    })
});
if (response.ok == false){
    const error = await response.json();
    return alert(error.message);
}
const data = await response.json()
sessionStorage.setItem(`userToken`, data.accessToken);
window.location.pathname = `/1/lesson-03/base/index.html`;
}