import { html, render } from 'https://unpkg.com/lit-html?module';

function attachEvents() {
    document.getElementById('btnLoad').addEventListener('click', getData)
    document.getElementById('btnCreate').addEventListener('click', postData)
}

async function getData() {
    const response = await fetch('http://localhost:3030/jsonstore/phonebook')
    const data = await response.json()
    const values = Object.values(data)
    const phonebook = document.getElementById('phonebook')

    const template = (bookEntries) => html`
        <li>${bookEntries.person}: ${bookEntries.phone} <button id=${bookEntries._id} @click=${deleteEntry}>Delete</button></li>
    `
    render(values.map(bookEntries => template(bookEntries)), phonebook)
}

async function deleteEntry(event) {
    await fetch(`http://localhost:3030/jsonstore/phonebook/` + event.target.id, {
        method: 'DELETE',
    })
     getData()
}

async function postData() {
    const person = document.getElementById('person').value
    const phone = document.getElementById('phone').value
    document.getElementById('person').value = ''
    document.getElementById('phone').value = ''

    await fetch('http://localhost:3030/jsonstore/phonebook', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ person, phone })
    })

    getData()
}

attachEvents();