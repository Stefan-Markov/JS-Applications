function attachEvents() {
    let baseUrl = "http://localhost:3030/jsonstore/messenger";

    let submitBtn = document.getElementById('submit');
    let refreshBtn = document.getElementById('refresh');
    let authorField = document.querySelector('input[name="author"]')
    let contentField = document.querySelector('input[name="content"]')
    let textArea = document.getElementById('messages');


    submitBtn.addEventListener('click', e => {
        e.preventDefault();

        fetch(baseUrl, {
            method: 'post',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                author: authorField.value,
                content: contentField.value
            })
        })

        authorField.value = '';
        contentField.value = '';
    })

    refreshBtn.addEventListener('click', e => {
        e.preventDefault();

        fetch(baseUrl)
            .then(res => res.json())
            .then(body => {
                textArea.value = '';  
                for (const item in body) {
                    textArea.value += `${body[item].author}:${body[item].content}\n`
                }
            })
    })

}

attachEvents();

