import viewFinder from "../viewFinder.js";

let section = undefined;
let navLinkClass = undefined;
let noIdeasHeading = undefined;

function initiliaze(domElement, linkClass) {
    section = domElement;
    navLinkClass = linkClass;
    noIdeasHeading = section.querySelector('#no-ideas');
}

function getView() {

    let url = 'http://localhost:3030/data/ideas?select=_id%2Ctitle%2Cimg&sortBy=_createdOn%20desc';
    [...section.children].forEach(el => el.remove());

    fetch(url)
        .then(res => res.json())
        .then(ideas => {
            console.log(ideas)
            let ideasInfo = Object.entries(ideas)
                .map(idea => {

                    let info = idea[1];
                    let title = info.title;
                    let imgIdea = info.img;
                    let ideaId = info._id;

                    let ideaHtml = createHtmlIdea(title, imgIdea, ideaId);
                    console.log(ideaHtml)

                    section.append(ideaHtml);
                })

        })
        .catch(err => {
            console.error('Error');
        })

    return section;

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

let dashboardPage = {
    initiliaze,
    getView
};

export default dashboardPage;