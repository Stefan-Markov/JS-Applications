import {render} from '../../node_modules/lit-html/lit-html.js';
import {allOptionsTemplate} from './templates/optionTemplates.js';

let menuSelect = document.getElementById('menu');

let addOptionForm = document.getElementById('add-option-form');
addOptionForm.addEventListener('submit', addItem);

let submitButton = document.getElementById('submit');
submitButton.disabled = true;

loadOptions();

let options = [];

async function loadOptions() {
    let optionsRespose = await fetch('http://localhost:3030/jsonstore/advanced/dropdown');
    let optionsObj = await optionsRespose.json();
    options = Object.values(optionsObj);
    render(allOptionsTemplate(options), menuSelect);
    submitButton.disabled = false;
}

async function addItem(e) {
    e.preventDefault();

    let form = e.target;
    let formData = new FormData(form);

    if (formData === undefined) {
        return;
    }

    let newOption = {
        text: formData.get('text')
    }

    let createResponse = await fetch('http://localhost:3030/jsonstore/advanced/dropdown', {
        headers: {'Content-Type': 'application/json'},
        method: 'Post',
        body: JSON.stringify(newOption)
    });

    let input = document.getElementById('itemText');
    input.value = '';
    if (createResponse.ok) {
        let createdOption = await createResponse.json();
        options.push(createdOption);
        render(allOptionsTemplate(options), menuSelect);
    }
}