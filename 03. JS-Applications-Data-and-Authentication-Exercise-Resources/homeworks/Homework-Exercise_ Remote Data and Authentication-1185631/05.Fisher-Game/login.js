const registerForm = document.getElementById('register')
const loginForm = document.getElementById('login')

registerForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const [email, password, rePass] = [...formData.values()]

    try {
        const response = await fetch('http://localhost:3030/users/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.trim(), password: password.trim() })
        });

        if (password !== rePass) {
            throw new Error('Passwords don\'t match!');
        }
        if (response.ok === false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const userData = await response.json();
        Object.entries(userData).forEach(([key, value]) => sessionStorage.setItem(key, value));
        e.target.reset();

        //mojem da polzvame location API-to za da redirectvame v multi page prilojeniq
        window.location.pathname = 'index.html';
    } catch (error) {
        alert(error.message);
        throw error;
    }
})

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const [email, password] = [...formData.values()]

    try {
        const response = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.trim(), password: password.trim() })
        });

        if (response.ok === false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const userData = await response.json();
        Object.entries(userData).forEach(([key, value]) => sessionStorage.setItem(key, value));
        e.target.reset();
      
        //mojem da polzvame location API-to za da redirectvame v multi page prilojeniq
        window.location.pathname = 'index.html';
    } catch (error) {
        alert(error.message);
        throw error;
    }
})

