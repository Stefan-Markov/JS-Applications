
import auth from "../services/authService.js";
import viewFinder from "../viewFinder.js";


let section = undefined;
let navLinkClass = undefined;


function initiliaze(domElement, linkClass) {
    section = domElement;
    navLinkClass = linkClass;

}

function getView(id) {

    let url = `http://localhost:3030/data/ideas/${id}`;
    [...section.children].forEach(el => el.remove());

    fetch(url)
        .then(res => res.json())
        .then(ideaDetails => {

            let title = ideaDetails.title;
            let ownerId = ideaDetails._ownerId;
            let ideaId = ideaDetails._id;
            let desrciption = ideaDetails.description;
            let ideaImg = ideaDetails.img;

            let htmlDescriptElem = creatHtmlIdeaDescription(ideaImg, title, desrciption, ownerId, ideaId);

            if (auth.getUserId() === ownerId) {

                const deleteBtn = document.createElement('a');
                deleteBtn.textContent = 'Delete';
                deleteBtn.classList.add('btn-detb', `${navLinkClass}`);
                deleteBtn.setAttribute('data-route', 'delete');
                deleteBtn.setAttribute('data-id', `${ideaId}`);
                deleteBtn.setAttribute('href', '#');
                deleteBtn.addEventListener('click', viewFinder.changeViewHandler);

                htmlDescriptElem.querySelector('.text-center').append(deleteBtn);
            }
           
            section.append(htmlDescriptElem);

        })
        .catch(err => {
            console.error('Error');
        })

    return section;
}
function creatHtmlIdeaDescription(ideaImg, title, description) {
    let imgElement = document.createElement('img');
    imgElement.classList.add('det-img');
    imgElement.src = ideaImg;

    let titleHeadingElement = document.createElement('h2');
    titleHeadingElement.classList.add('display-5');
    titleHeadingElement.textContent = title;

    let descriptionLabelElement = document.createElement('p');
    descriptionLabelElement.classList.add('infoType');
    descriptionLabelElement.textContent = 'Description:';

    let descriptionIdea = document.createElement('p');
    descriptionIdea.classList.add('idea-description');
    descriptionIdea.textContent = description;

    let divDelete = document.createElement('div');
    divDelete.classList.add('text-center');

    let descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('desc');
    descriptionDiv.append(titleHeadingElement, descriptionLabelElement, descriptionIdea);

    let fragment = document.createDocumentFragment();
    fragment.append(imgElement, descriptionDiv,divDelete);
    return fragment;
}

export function deleteIdea(id, user) {
    
    let url = `http://localhost:3030/data/ideas/${id}`

    fetch(url, {
        
        method: 'Delete',

       headers: {
        'X-Authorization': auth.getAuthToken(user)
       }
    })
    .then(res => console.log(res))
    viewFinder.navigateTo('dashboard');
}

let ideaDetailsPage = {
    initiliaze,
    getView,
    deleteIdea
};

export default ideaDetailsPage;