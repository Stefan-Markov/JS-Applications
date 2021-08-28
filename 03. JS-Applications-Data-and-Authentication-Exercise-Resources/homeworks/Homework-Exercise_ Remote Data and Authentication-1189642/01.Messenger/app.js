function attachEvents() {
    let sendButton = document.getElementById('submit');
    sendButton.addEventListener('click', createMessage);
    let refreshButton = document.getElementById('refresh');
    refreshButton.addEventListener('click', getMessages);
    let textarea = document.getElementById('messages');

    async function getMessages() {
        try {
            let url = 'http://localhost:3030/jsonstore/messenger';
            let getMessagesResult = await fetch(url);
            let messages = await getMessagesResult.json();
            console.log(messages);

            let messageStr = Object.values(messages)
                .map(m => `${m.author}: ${m.content}`)
                .join('\n');
            textarea.value = messageStr;
        } catch (err) {
            console.error(err);
        }
    }

    async function createMessage() {
        try {
            let authorElement = document.getElementById('author');
            let contentElement = document.getElementById('content');
            let url = 'http://localhost:3030/jsonstore/messenger';

            let newMessage = {
                author: authorElement.value,
                content: contentElement.value
            };

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

            let createMessageStr = `${createResult.author}: ${createResult.content}`;
            textarea.value = textarea.value + `\n${createMessageStr}`;
            //await getMessages();
        } catch (err) {
            console.error(err);
        }
    }
}
attachEvents();


