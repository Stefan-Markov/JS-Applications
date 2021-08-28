export function createHomeTopic(topic) {
    let topicWrapperElement = document.createElement('div');
    topicWrapperElement.classList.add('topic-name-wrapper');

    let topicNameElement = document.createElement('div');
    topicNameElement.classList.add('topic-name');

    let aElement = document.createElement('a');
    aElement.href = '#';
    aElement.id = topic._id;
    aElement.classList.add('normal');
    aElement.addEventListener('click', pageHandler);

    let hElement = document.createElement('h2');
    hElement.textContent = topic.title;

    let columsDiv = document.createElement('div');
    columsDiv.classList.add('colums');

    let div = document.createElement('div');

    let paragraphElement = document.createElement('p');
    paragraphElement.textContent = 'Date: ';

    let timeElement = document.createElement('time');
    timeElement.textContent = getTimeHomeFormat();
    paragraphElement.appendChild(timeElement);

    let nicknameElement = document.createElement('div');
    nicknameElement.classList.add('nick-name');

    let nicknameParagraph = document.createElement('p');
    nicknameParagraph.textContent = 'Username: ';

    let span = document.createElement('span');
    span.textContent = topic.username;

    nicknameParagraph.appendChild(span);
    nicknameElement.appendChild(nicknameParagraph);

    div.appendChild(paragraphElement);
    div.appendChild(nicknameElement);

    columsDiv.appendChild(div);
    aElement.appendChild(hElement);
    topicNameElement.appendChild(aElement);
    topicNameElement.appendChild(columsDiv);

    topicWrapperElement.appendChild(topicNameElement);
}

function pageHandler(e) {
    e.preventDefault();
    let x = e.target.parentElement;
    let id = x.id;
    localStorage.setItem('topicId', id);
    location.assign('theme-content.html')
}


export function getTimeHomeFormat() {
    let time = new Date();
    let year = time.getFullYear()
    let month = time.getMonth()
        .toString()
        .padStart(2, 0);

    let day = time.getDay()
        .toString()
        .padStart(2, 0);

    let hours = time.getHours() > 12 ? (time.getHours() - 12).toString().padStart(2, 0)
        : (time.getHours()).toString().padStart(2, 0);
    let minutes = time.getMinutes()
        .toString()
        .padStart(2, 0);

    let seconds = time.getHours()
        .toString()
        .padStart(2, 0);

    let miliseconds = time.getMilliseconds()
        .toString()
        .padStart(3, 0);

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${miliseconds}Z`;
}

const homeModule = {
    getTimeHomeFormat,
    createHomeTopic
}

export default homeModule;