//NOT fully finished
//The edit part runs 3 times for some reason. Need to find solution


let url = 'http://localhost:3030/jsonstore/collections/books';

let loadBooks = document.getElementById('loadBooks');
let tbody = document.querySelector('table tbody')

let titleInputField = document.querySelector('form input[name="title"]')
let authorInputField = document.querySelector('form input[name="author"]')

let form = document.querySelector('form')
let formTitle = document.querySelector('form h3')
let formButton = document.querySelector('form button')

//CREATE
form.addEventListener('submit', e =>{
    e.preventDefault();
    if(!formButton.classList.contains('saveBtn')){
        createBook();
    }
    
})

//READ
loadBooks.addEventListener('click', getBooks) 


function getBooks(){ 
    try {
        fetch(url)
            .then(res => res.json())
            .then(body => {
                
                while(tbody.lastChild){
                    tbody.firstChild.remove();
                }

                for (const book in body) {
                    let tr = document.createElement('tr');
                    tr.setAttribute('data-object-id', book)

                    let tdTitle = document.createElement('td');
                    tdTitle.textContent = body[book].title;

                    let tdAuthor = document.createElement('td');
                    tdAuthor.textContent = body[book].author;

                    let tdButtons = document.createElement('td');

                    let editButton = document.createElement('button');
                    editButton.textContent = 'Edit';
                    editButton.addEventListener('click', e =>{
                        let currentRow = e.target.parentNode.parentNode;

                        editBook(currentRow);
                    })

                    let deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';

                    tr.appendChild(tdTitle)
                    tr.appendChild(tdAuthor)

                    tdButtons.appendChild(editButton)
                    tdButtons.appendChild(deleteButton)

                    tr.appendChild(tdButtons);
                    tbody.appendChild(tr);
                }

            })
    } catch (err){
        console.log(err)
    }
}

function createBook(){
    try {
        if(titleInputField !== '' && authorInputField !== ''){
            let title = titleInputField.value;
            let author = authorInputField.value;

            fetch(url, {
                method: 'Post',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    author,
                    title
                })
            })

            titleInputField.value = '';
            authorInputField.value = '';
        }
    } catch (err) {
        console.log(err);
    }

}

function editBook(currentRow){
    formTitle.textContent = 'Edit Form';
    formButton.textContent = 'Save';
    formButton.classList.add('saveBtn')

    let currentRowId = currentRow.getAttribute('data-object-id')

    titleInputField.value = Array.from(currentRow.childNodes)[0].textContent;
    authorInputField.value = Array.from(currentRow.childNodes)[1].textContent;

    formButton.addEventListener('click', e =>{
        e.preventDefault();

        try {
            fetch(`${url}/${currentRowId}`, {
                method: 'Put',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    author: authorInputField.value,
                    title: titleInputField.value
                })
            })
            .then(getBooks)
        } catch (err) {
            console.log(err);
        }

        formButton.classList.remove('saveBtn')
        formTitle.textContent = 'Edit';
        formButton.textContent = 'Submit';
        titleInputField.value = '';
        authorInputField.value = '';

    })

       
    
}