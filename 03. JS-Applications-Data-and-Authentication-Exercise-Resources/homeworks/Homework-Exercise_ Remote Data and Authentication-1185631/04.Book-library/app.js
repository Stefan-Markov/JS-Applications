import { html, render } from 'https://unpkg.com/lit-html?module'; //needed library to create DOM. Learned from Client Side Rendering 

document.getElementById('loadBooks').addEventListener('click', getData)
document.getElementById('submitForm').addEventListener('submit', postData)

async function getData() {
    const response = await fetch('http://localhost:3030/jsonstore/collections/books')
    const data = await response.json()

    //using material from Client Side Rendering for creating DOM
    const template = (books) => html`
    <tr>
        <td>${books[1].title}</td>
        <td>${books[1].author}</td>
        <td id=${books[0]}>
            <button @click=${edit}>Edit</button>
            <button @click=${del}>Delete</button>
        </td>
    </tr>
    `

    const tbody = document.querySelector('table>tbody')
    render(Object.entries(data).map(template), tbody); //append every bookInfo to DOM
}

async function postData(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const author = formData.get('author').trim()
    const title = formData.get('title').trim()

    try {
        if (!author || !title) {
            throw new Error('All fields are required!')
        }
        await fetch('http://localhost:3030/jsonstore/collections/books', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author })
        })
    } catch (error) {
        alert('All fields are required!')
        throw new Error('All fields are required!')
    }

    e.target.reset()
    getData()
}

async function del(e) {
    const id = e.target.parentElement.id

    await fetch('http://localhost:3030/jsonstore/collections/books/' + id, {
        method: 'delete'
    })

    getData()
}

async function edit(e) {
    const id = e.target.parentElement.id
    const editForm = document.getElementById('editForm')
    const submitForm = document.getElementById('submitForm');

    editForm.style.display = 'block'
    submitForm.style.display = 'none'

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)
        const author = formData.get('author').trim()
        const title = formData.get('title').trim()

        await fetch('http://localhost:3030/jsonstore/collections/books/' + id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, author })
        })

        editForm.style.display = 'none'
        submitForm.style.display = 'block'
        e.target.reset()
        getData()
    })
}