import {html,render} from '../node_modules/lit-html/lit-html.js';

let box = document.getElementById('errorBox');

export function notify(message) {
    const template = html`<span>${message}</span>`;
    render(template, box);
    box.style.display = 'block';
    setTimeout(() => {
        box.style.display = 'none'
    }, 3000)
}
