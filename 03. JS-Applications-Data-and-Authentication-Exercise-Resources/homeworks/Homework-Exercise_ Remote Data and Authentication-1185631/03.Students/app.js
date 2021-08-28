import {html, render} from "../../../../node_modules/lit-html/lit-html.js"; //needed library to create DOM. Learned from Client Side Rendering
// ../../../../node_modules/lit-html
document.getElementById('form').addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const [firstName, lastName, facultyNumber, grade] = [...formData.values()]

    await postData(firstName, lastName, facultyNumber, grade)
    await getData()

    e.target.reset()
})

async function postData(firstName, lastName, facultyNumber, grade) {
    try {
        if ((typeof firstName === 'string' && !Number(firstName) && firstName)
            && (typeof lastName === 'string' && !Number(lastName) && lastName) && Number(facultyNumber) && Number(grade)) {

            return await fetch('http://localhost:3030/jsonstore/collections/students', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({firstName, lastName, facultyNumber, grade})
            })
        } else {
            throw new Error('Invalid parameters entered!')
        }
    } catch (error) {
        alert(error)
        throw new Error('Invalid parameters entered!')
    }
}

async function getData() {
    const response = await fetch('http://localhost:3030/jsonstore/collections/students')
    const data = await response.json()

    //using material from Client Side Rendering for creating DOM
    const template = (student) => html`
        <tr>
            <td>${student.firstName}</td>
            <td>${student.lastName}</td>
            <td>${student.facultyNumber}</td>
            <td>${student.grade}</td>
        </tr>`

    const tbody = document.querySelector('#results tbody')
    render(Object.values(data).map(student => template(student)), tbody) //append every student to DOM
}
