
import auth from "../services/authService.js";
import viewFinder from "../viewFinder.js";


let section = undefined;
let navLinkClass = undefined;

function initiliaze(domElement, linkClass) {
    section = domElement;
    navLinkClass = linkClass;
    let form = section.querySelector('form');
    form.addEventListener('submit', createIdea);
}

async function getView() {
    return section;

}

function createIdea(e) {

    let url = 'http:localhost:3030/data/ideas';
    e.preventDefault();

    let form = e.target;
    let formData = new FormData(form);
    let user = {
        title: formData.get('title'),
        description: formData.get('description'),
        img: formData.get('imageURL'),
    }
    console.log(user)
    fetch(url, {
        method: 'Post',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': auth.getAuthToken(user)
        },
        body: JSON.stringify(user)
    })
        .then(res => res.json())
        .then(newIdea => {

            let title = newIdea.title;
            let description = newIdea.description;
            let ideaImg = newIdea.img;
            let newIdeaId = newIdea._id;
            let newIdeaOwnerId = newIdea._ownerId;

            let newideaHtml = createHtmlIdea(title, description, ideaImg, newIdeaId, newIdeaOwnerId);
            
        })

    viewFinder.navigateTo('dashboard');
    form.reset();

}

function createHtmlIdea(title, ideaImg, ideaId) {

    let ideaDiv = document.createElement('div');
    ideaDiv.classList.add('card', 'overflow-hidden', 'current-card', 'detailsidea');
    ideaDiv.style.width = '20rem';
    ideaDiv.style.height = '18rem';

    let titleElement = document.createElement('p');
    titleElement.classList.add('card-text');
    titleElement.textContent = title;

    let cardBodyDiv = document.createElement('div');
    cardBodyDiv.append(titleElement);

    let imgElement = document.createElement('img');
    imgElement.classList.add('card-image');
    imgElement.src = ideaImg;
    imgElement.alt = 'Card image cap';

    const detailsBtn = document.createElement('a');
    detailsBtn.textContent = 'Details';
    detailsBtn.classList.add('btn', `${navLinkClass}`);
    detailsBtn.setAttribute('href', '#');
    detailsBtn.setAttribute('data-route', 'details');
    detailsBtn.setAttribute('data-id', `${ideaId}`)
    detailsBtn.addEventListener('click', viewFinder.changeViewHandler);

    ideaDiv.append(cardBodyDiv, imgElement, detailsBtn);

    return ideaDiv;
}


let createIdeaPage = {
    initiliaze,
    getView
};

export default createIdeaPage