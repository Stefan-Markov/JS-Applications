function init() {

    document.querySelector('form[action="/register"]').addEventListener('submit', registerUser);
    document.querySelector('form[action="/login"]').addEventListener('submit', loginUser);

    function registerUser(e) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');
        const rePassword = formData.get('rePass');

        if (email && /^(.+)@(.+)$/.test(email) &&
            password && password === rePassword) {
            e.currentTarget.reset();

            const url = 'http://localhost:3030/users/register';
            fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                })
                .then(responce => responce.json())
                .then(data => {
                    localStorage.setItem('userId', data._id);
                    localStorage.setItem('userAccessToken', data.accessToken);
                    document.location.href = '/homeLogged.html';
                })
                .catch();
        }
    }

    function loginUser(e) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const email = formData.get('email');
        const password = formData.get('password');

        if (email && /^(.+)@(.+)$/.test(email) && password) {
            e.currentTarget.reset();

            const url = 'http://localhost:3030/users/login';
            fetch(url, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ email, password }),
                })
                .then(responce => responce.json())
                .then(data => {
                    localStorage.setItem('userId', data._id);
                    localStorage.setItem('userAccessToken', data.accessToken);
                    document.location.href = '/homeLogged.html';
                })
                .catch();
        }
    }
}

window.addEventListener('DOMContentLoaded', init);