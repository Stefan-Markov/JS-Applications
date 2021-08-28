async function solve() {
    const url = `http://localhost:3030/jsonstore/collections/students`;

    let table = document.querySelector('tbody');

    let response = await fetch(url);

    let data = await response.json();

    Object.values(data).forEach(s => {
        let firstName = s.firstName;
        let lastName = s.lastName;
        let facultyNumber = Number(s.facultyNumber);
        let grade = Number(s.grade).toFixed(2);
        let tr = document.createElement('tr');
        let firstNameCell = tr.insertCell(0);
        firstNameCell.innerText = firstName;
        let lastNameCell = tr.insertCell(1);
        lastNameCell.innerText = lastName;
        let facultyNumberCell = tr.insertCell(2);
        facultyNumberCell.innerText = facultyNumber;
        let gradeCell = tr.insertCell(3);
        gradeCell.innerText = grade;

        table.appendChild(tr);
    });

    let submitBtn = document.querySelector('#submit');
    submitBtn.addEventListener('click', onClickSubmit);

    async function onClickSubmit(event) {
        event.preventDefault();

        let firstNameInput = document.getElementsByName('firstName')[0];
        let lastNameInput = document.getElementsByName('lastName')[0];
        let facultyNumberInput = document.getElementsByName('facultyNumber')[0];
        let gradeInput = document.getElementsByName('grade')[0];

        if (firstNameInput.value == '' ||
            lastNameInput.value == '' ||
            facultyNumberInput.value == '' ||
            gradeInput.value == '') {

            return alert('All input fields are required!');
        }

        if (isNaN(facultyNumberInput.value) ||
            isNaN(gradeInput.value)) {

            return alert('Grade and Faculty Number must be Number');
        }

        let response = await fetch(url, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                firstName: firstNameInput.value,
                lastName: lastNameInput.value,
                facultyNumber: Number(facultyNumberInput.value),
                grade: Number(gradeInput.value).toFixed(2)
            })
        });

        let tr = document.createElement('tr');

        let firstNameCell = tr.insertCell(0);
        firstNameCell.innerText = firstNameInput.value;

        let lastNameCell = tr.insertCell(1);
        lastNameCell.innerText = lastNameInput.value;

        let facultyNumberCell = tr.insertCell(2);
        facultyNumberCell.innerText = Number(facultyNumberInput.value);

        let gradeCell = tr.insertCell(3);
        gradeCell.innerText = Number(gradeInput.value).toFixed(2);

        table.appendChild(tr);

        firstNameInput.value = '';
        lastNameInput.value = '';
        facultyNumberInput.value = '';
        gradeInput.value = '';

    }
}


solve();