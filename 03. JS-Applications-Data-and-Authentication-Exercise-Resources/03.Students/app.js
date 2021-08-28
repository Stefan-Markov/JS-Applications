let button = document.getElementById('submit');
button.addEventListener('click', addItem);

function addItem(e) {
    e.preventDefault();
    let fNameInput = document.getElementById('fname');
    let fLastInput = document.getElementById('lname');
    let numberInput = document.getElementById('number');
    let gradeInput = document.getElementById('grade');

    let firstName = fNameInput.value;
    let lastName = fLastInput.value;
    let facultyNumber = numberInput.value;
    let grade = gradeInput.value;


    let object = {firstName, lastName, facultyNumber, grade};
    if (firstName === '' || lastName === '' || facultyNumber === '' || grade === '') {
        return;
    }
    fetch('http://localhost:3030/jsonstore/collections/students', {
        method: 'Post',
        body: JSON.stringify(object)
    }).catch(error => console.log(error));

    create().catch(error => console.log(error));

    fNameInput.value = '';
    fLastInput.value = '';
    numberInput.value = '';
    gradeInput.value = '';
}

async function create() {
    let result = await fetch('http://localhost:3030/jsonstore/collections/students');
    let data = await result.json();

    let entries = Object.entries(data);
    entries.forEach(d => appendElements(d));

    function appendElements(data) {
        let table = document.querySelector('#results > tbody');
        let row = document.createElement('tr');

        if (data[1].firstName === undefined) {
            return;
        }

        let [id, {firstName, lastName, facultyNumber, grade}] = data;

        let tdFname = document.createElement('td');
        let tdLname = document.createElement('td');
        let tdNumber = document.createElement('td');
        let tdGrade = document.createElement('td');

        tdFname.textContent = firstName;
        tdFname.dataset.id = id;
        tdLname.textContent = lastName;
        tdNumber.textContent = facultyNumber;
        tdGrade.textContent = grade;

        row.appendChild(tdFname);
        row.appendChild(tdLname);
        row.appendChild(tdNumber);
        row.appendChild(tdGrade);

        table.appendChild(row);
        return table;
    }
}