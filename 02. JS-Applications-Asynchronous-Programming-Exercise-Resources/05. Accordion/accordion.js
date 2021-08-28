(() => {
    let section = document.querySelector('#main');

    fetch("http://localhost:3030/jsonstore/advanced/articles/list")
        .then(r => r.json())
        .then(result => {
            result.forEach(x => {
                section.appendChild(createDiv(x.title, x._id));
                console.log(result)
            })
        })
        .catch(error =>
            console.log(error));

    function createDiv(title, id) {
        let accordionDiv = document.createElement('div');
        accordionDiv.classList.add('accordion');

        let headDiv = document.createElement('div');
        headDiv.classList.add('head');

        let span = document.createElement('span');
        span.textContent = title;

        let buttonMore = document.createElement('button');
        buttonMore.classList.add('button');
        buttonMore.textContent = 'More';

        let divExtras = document.createElement('div');
        divExtras.classList.add('extra');
        let pTag = document.createElement('p');

        fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`)
            .then(result => result.json())
            .then(data => {
                pTag.textContent = data.content;
            });
        divExtras.appendChild(pTag);

        buttonMore.addEventListener('click', (e) => {
            if (e.target.textContent === 'More') {
                buttonMore.textContent = 'Less';
                divExtras.style.display = 'block';
            } else {
                buttonMore.textContent = 'More';
                divExtras.style.display = 'none';
            }
        });


        headDiv.appendChild(span);
        headDiv.appendChild(buttonMore);

        accordionDiv.appendChild(headDiv);
        accordionDiv.appendChild(divExtras);
        return accordionDiv;
    }
})();
