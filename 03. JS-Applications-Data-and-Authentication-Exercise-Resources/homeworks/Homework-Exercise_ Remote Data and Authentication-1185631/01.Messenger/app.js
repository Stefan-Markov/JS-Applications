function attachEvents() {
    document.querySelector('#submit').addEventListener('click', postData)
    document.querySelector('#refresh').addEventListener('click', getData)
}

async function postData() {
    const author = document.querySelector('input[name="author"]').value
    const content = document.querySelector('input[name="content"]').value

    document.querySelector('input[name="author"]').value = ''
    document.querySelector('input[name="content"]').value = ''

    const url = 'http://localhost:3030/jsonstore/messenger'
    return await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ author, content })
    })
}

async function getData() {
    const url = 'http://localhost:3030/jsonstore/messenger'

    const response = await fetch(url)
    const data = await response.json()

    document.querySelector('#messages').textContent = Object.values(data)
        .map(v => `${v.author}: ${v.content}`).join('\n')

    // const result = Object.values(data).reduce((acc, value) => {
    //     acc.push(`${value.author}: ${value.content}`);

    //     return acc;
    // }, []);

    // document.querySelector('#messages').textContent = result.join('\n')
}

attachEvents();