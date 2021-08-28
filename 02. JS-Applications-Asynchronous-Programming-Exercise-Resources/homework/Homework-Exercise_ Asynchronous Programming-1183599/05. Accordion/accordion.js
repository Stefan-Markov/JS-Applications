function solution() {
    const baseArticleUrl = 'http://localhost:3030/jsonstore/advanced/articles/list';
    const baseDetailsUrl = 'http://localhost:3030/jsonstore/advanced/articles/details/';

    let mainSectionElement = document.getElementById('main');

    fetch(baseArticleUrl)
        .then(response => response.json())
        .then(data => {
            for (const article of Object.values(data)) {
                let accordionDiv = document.createElement('div');
                accordionDiv.classList.add('accordion');

                let headDiv = document.createElement('div');
                headDiv.classList.add('head');

                let titleSpan = document.createElement('span');
                titleSpan.textContent = article.title;

                let moreBtn = document.createElement('button');
                moreBtn.classList.add('button');
                moreBtn.id = article._id;
                moreBtn.textContent = 'More';

                headDiv.appendChild(titleSpan);
                headDiv.appendChild(moreBtn);

                let extraDiv = document.createElement('div');
                extraDiv.classList.add('extra');
                extraDiv.style.display = 'none';

                let p = document.createElement('p');
                extraDiv.appendChild(p);

                accordionDiv.appendChild(headDiv);
                accordionDiv.appendChild(extraDiv);

                mainSectionElement.appendChild(accordionDiv);

                moreBtn.addEventListener('click', (e) => {
                    let id = e.target.id;

                    if (moreBtn.textContent === 'More') {

                        extraDiv.style.display = 'block';

                        fetch(`${baseDetailsUrl}${id}`)
                            .then(response => response.json())
                            .then(data => {
                                p.textContent = data.content;
                            })
                            .catch(error => console.log(error))

                        moreBtn.textContent = 'Less';
                    } else {
                        extraDiv.style.display = 'none';

                        moreBtn.textContent = 'More';
                    }

                })
            }
        })
}

solution();