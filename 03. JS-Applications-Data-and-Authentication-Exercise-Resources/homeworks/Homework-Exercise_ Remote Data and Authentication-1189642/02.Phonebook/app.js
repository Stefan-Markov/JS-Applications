
function attachEvents() {
    let loadBtn = document.querySelector(`button#btnLoad`);
    let createBtn = document.querySelector(`button#btnCreate`);
    let personField = document.querySelector(`input#person`);
    let phoneField = document.querySelector(`input#phone`)
    let phoneBookUl = document.querySelector(`ul#phonebook`);
    let url = `http://localhost:3030/jsonstore/phonebook`;

    loadBtn.addEventListener(`click`, function () {

        phoneBookUl.innerHTML = ``;
        fetch(url)
            .then(responsive => responsive.json())
            .then(data => {
                Object.entries(data).forEach(el => {
                    let li = document.createElement(`li`);
                    let delBtn = document.createElement(`button`);

                    delBtn.textContent = `Delete`;
                    li.id = el[0];
                    let delUrl = `localhost:3030/jsonstore/phonebook/${li.id}`
                    li.textContent = `${el[1].person}:${el[1].phone}`;
                    li.appendChild(delBtn);

                    delBtn.addEventListener(`click`, function () {
                        fetch(delUrl, { method: `DELETE` })
                        phoneBookUl.innerHTML = ``;
                    })
                    phoneBookUl.appendChild(li);
                })
            })
    })

    createBtn.addEventListener(`click`, function () {
        let personInfo = personField.value;
        let phoneInfo = phoneField.value;
        if (personInfo === `` || phoneInfo === ``) {
            return;
        }
        fetch(url, { method: `POST`, body: JSON.stringify({ person: personInfo, phone: phoneInfo }) })
        personField.value = ``;
        phoneField.value = ``;
    })
}

attachEvents();