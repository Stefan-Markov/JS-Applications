function attachEvents() {

    let phonebookUL = document.getElementById('phonebook');
    let buttonLoad = document.getElementById('btnLoad');

    buttonLoad.addEventListener('click', loadItems);

    let personInput = document.getElementById('person');
    let phoneInput = document.getElementById('phone');
    let buttonCreate = document.getElementById('btnCreate');

    buttonCreate.addEventListener('click', createItem)

    async function createItem() {
        let person = personInput.value;
        let phone = phoneInput.value;
        let newPerson = {person, phone}

        let response = await fetch('http://localhost:3030/jsonstore/phonebook', {
            method: 'Post',
            body: JSON.stringify(newPerson)
        })

        if (response.status === 200) {
            console.log('e')
        }
        personInput.value = '';
        phoneInput.value = '';
    }

    async function loadItems() {

        let resultJSON = await fetch('http://localhost:3030/jsonstore/phonebook');
        let result = await resultJSON.json();


        Object.entries(result).forEach(el => {
            let id = el[0];
            let person = el[1].person;
            let phone = el[1].phone;
            let li = document.createElement('li');
            let button = document.createElement('button');
            button.textContent = 'Delete';

            li.textContent = `${person} ${phone}`
            li.dataset.id = id;
            li.appendChild(button);
            phonebookUL.appendChild(li);
            button.addEventListener('click', deleteItem)
        });

    }

    async function deleteItem(e) {
        let item = e.target.parentElement;

        let id = item.dataset.id;

        let deleteResponse = await fetch(`http://localhost:3030/jsonstore/phonebook/${id}`, {
            method: 'Delete'
        });

        if (deleteResponse.status === 200) {
            item.remove();
        }

    }
}

attachEvents();