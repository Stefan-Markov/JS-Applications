import { html, render } from 'https://unpkg.com/lit-html?module'; //needed library to create DOM. Learned from Client Side Rendering 

const loginBtn = document.querySelector('nav #guest a')

if (sessionStorage.length > 0) {
    loginBtn.textContent = 'Logout'
    loginBtn.addEventListener('click', () => {
        sessionStorage.clear()
        window.location.pathname = 'login.html';
    });
}

const catches = document.getElementById('catches')
const addBtn = document.querySelector('.add')
addBtn.disabled = sessionStorage.accessToken === undefined
addBtn.addEventListener('click', createCatch)

const loadBtn = document.querySelector('.load')
loadBtn.addEventListener('click', load)

async function load() {
    const response = await fetch('http://localhost:3030/data/catches')
    const data = await response.json();

    //using material from Client Side Rendering for creating DOM
    const template = (c) => html`
    <div class="catch" id=${c._id}>
        <label>Angler</label>
        <input type="text" class="angler" value=${c.angler} />
        <hr>
        <label>Weight</label>
        <input type="number" class="weight" value=${c.weight} />
        <hr>
        <label>Species</label>
        <input type="text" class="species" value=${c.species} />
        <hr>
        <label>Location</label>
        <input type="text" class="location" value=${c.location} />
        <hr>
        <label>Bait</label>
        <input type="text" class="bait" value=${c.bait} />
        <hr>
        <label>Capture Time</label>
        <input type="number" class="captureTime" value=${c.captureTime} />
        <hr>
        <button @click=${update} disabled class="update">Update</button> 
        <button @click=${del} disabled class="delete">Delete</button>
    </div>
    `

    render(data.map(c => template(c)), catches) //append every bookInfo to DOM

    if (sessionStorage.length > 0) {
        const updateBtn = [...document.querySelectorAll('.update')]
        updateBtn.forEach(u => u.disabled = false)

        const deleteBtn = [...document.querySelectorAll('.delete')]
        deleteBtn.forEach(d => d.disabled = false)
    }
}

async function update(e) {
    const currentCatch = e.target.parentElement;
    const id = currentCatch.id

    const angler = currentCatch.querySelector('.angler')
    const weight = currentCatch.querySelector('.weight')
    const species = currentCatch.querySelector('.species')
    const location = currentCatch.querySelector('.location')
    const bait = currentCatch.querySelector('.bait')
    const captureTime = currentCatch.querySelector('.captureTime')

    const updatedCatch = {
        angler: angler.value,
        weight: Number(weight.value),
        species: species.value,
        location: location.value,
        bait: bait.value,
        captureTime: Number(captureTime.value)
    }

    try {
        const response = await fetch('http://localhost:3030/data/catches/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': sessionStorage.accessToken
            },
            body: JSON.stringify(updatedCatch)
        })

        if (response.ok === false) {
            throw new Error('You are not the owner!');
        }

        return await load()
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

async function del(e) {
    const currentCatch = e.target.parentElement;
    const id = currentCatch.id

    try {
        const response = await fetch('http://localhost:3030/data/catches/' + id, {
            method: 'delete',
            headers: {
                'X-Authorization': sessionStorage.accessToken
            },
        })

        if (response.ok === false) {
            throw new Error('You are not the owner!');
        }

        return await load()
    } catch (error) {
        alert(error.message);
        throw error;
    }
}

async function createCatch() {
    const angler = document.querySelector('#addForm .angler')
    const weight = document.querySelector('#addForm .weight')
    const species = document.querySelector('#addForm .species')
    const location = document.querySelector('#addForm .location')
    const bait = document.querySelector('#addForm .bait')
    const captureTime = document.querySelector('#addForm .captureTime')

    const newCatch = {
        angler: angler.value,
        weight: Number(weight.value),
        species: species.value,
        location: location.value,
        bait: bait.value,
        captureTime: Number(captureTime.value)
    }

    await fetch('http://localhost:3030/data/catches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Authorization': sessionStorage.accessToken },
        body: JSON.stringify(newCatch)
    })

    return await load()
}


