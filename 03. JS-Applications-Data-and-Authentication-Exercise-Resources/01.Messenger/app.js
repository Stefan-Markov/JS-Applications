function attachEvents() {
    let sendButton = document.getElementById('submit');
    sendButton.addEventListener('click', createMessage)
    let refreshButton = document.getElementById('refresh');
    refreshButton.addEventListener('click', getAllMessages);
    let textarea = document.getElementById('messages');

    async function getJsonResource(url) {
        let getMessagesResult = await fetch(url);
        return await getMessagesResult.json();
    }

    async function getAllMessages() {
        try {
            let url = 'http://localhost:3030/jsonstore/messenger';
            let messages = await getJsonResource(url);
            textarea.value = Object.values(messages)
                .map(message => `${message.author}: ${message.content}`)
                .join('\n');
        } catch (err) {
            console.error(err);
        }
    }


    async function createMessage() {
        try {
            let authorInput = document.getElementById('author');
            let contentInput = document.getElementById('content');
            let url = 'http://localhost:3030/jsonstore/messenger';

            let newMessage = {
                author: authorInput.value,
                content: contentInput.value
            };
            authorInput.value = '';
            contentInput.value = '';

            let createResponse = await fetch(url,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'Post',
                    body: JSON.stringify(newMessage)
                });
            let createResult = await createResponse.json();
            console.log(createResult);
            let createdMessageString = `${createResult.author}: ${createResult.content}`;
            textarea.value = textarea.value + `\n${createdMessageString}`;
        } catch (err) {
            console.error(err);
        }
    }
}

attachEvents();