const formElement = document.querySelector('form');
let registerUrl = `http://localhost:3030/users/register`;
formElement.addEventListener('submit', onRegisterSubmit);

    async function onRegisterSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    let email = formData.get(`email`);
    let password = formData.get(`password`);
    let repeatPassword = formData.get(`rePass`);

    if (email == "" || password == "" || repeatPassword == "") {
        return alert(`All fields are requred`);
    } else if (password !== repeatPassword) {
        return alert(`Passwords don\'t match`);
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