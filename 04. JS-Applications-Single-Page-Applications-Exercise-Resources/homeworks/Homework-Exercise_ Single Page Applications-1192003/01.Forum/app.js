import { createHomeTopic } from "./homeTopic.js";

let topicContainerElement = document.querySelector('.topic-container');

fetch('http://localhost:3030/jsonstore/collections/myboard/posts')
    .then(res => res.json())
    .then(function (res) {
        Object.values(res).forEach(topic => {
            topicContainerElement.appendChild(createHomeTopic(topic));
        })
    })

let form = document.querySelector('main form');
form.addEventListener('submit', createPost);

let cancelButton = form.querySelector('.cancel');
cancelButton.addEventListener('click', form.reset());

function createPost(e) {
    e.preventDefault();

    let formData = new FormData(e.target);
    let title = formData.get('topicName');
    let username = formData.get('username');
    let post = formData.get('postText');

    let topicData = [title, username, post];
    if (topicData.some(x => x === '')) {
        alert('Required fields cannot be empty!');
        return;
    }

    e.target.reset();

    let url = 'http://localhost:3030/jsonstore/collections/myboard/posts';
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username,
            title,
            post
        })
    })
        .then(res => res.json())
        .then(res => topicContainerElement.appendChild(createHomeTopic(res)));
}
