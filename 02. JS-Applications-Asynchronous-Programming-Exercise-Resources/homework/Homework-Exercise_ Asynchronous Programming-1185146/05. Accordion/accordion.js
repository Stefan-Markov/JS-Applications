function solution() {
    let articlesBaseUrl = 'http://localhost:3030/jsonstore/advanced/articles/list';
    let mainSection = document.getElementById('main');

    fetch(articlesBaseUrl)
        .then(response => response.json())
        .then(articlesData => {
            createArticles(articlesData);
        })
        .catch(error => console.log(error));

    function createArticles(data) {
        let detailsBaseUrl = 'http://localhost:3030/jsonstore/advanced/articles/details/';

        data.forEach(article => {
            let articleId = article['_id'];
            let articleTitle = article.title;

            let newArticleDiv = createElement('div', 'accordion');
            let articleHeadDiv = createElement('div', 'head')
            let articleTitleSpan = document.createElement('span');
            let articleDetailsDiv = createElement('div', 'extra');
            let toggleButton = createElement('button', 'button');
            toggleButton.textContent = 'More';
            let articlesDetailsParagraph = document.createElement('p');

            articleTitleSpan.textContent = articleTitle;
            toggleButton.id = articleId;
            toggleButton.addEventListener('click', toggleDetails);

            fetch(`${detailsBaseUrl}${articleId}`)
                .then(response => response.json())
                .then(articleDetails => {
                    articlesDetailsParagraph.textContent = articleDetails.content;
                })
                .catch(error => console.log(error));

            articleDetailsDiv.appendChild(articlesDetailsParagraph);
            articleHeadDiv.appendChild(articleTitleSpan);
            articleHeadDiv.appendChild(toggleButton);
            newArticleDiv.appendChild(articleHeadDiv);
            newArticleDiv.appendChild(articleDetailsDiv);
            mainSection.appendChild(newArticleDiv);
        });

        function toggleDetails(e) {
            let details = e.target.parentNode.parentNode.querySelector('div.extra');
            if (details.style.display === 'none' || details.style.display === '') {
                details.style.display = 'block';
                e.target.textContent = 'Less';
            } else {
                details.style.display = 'none';
                e.target.textContent = 'More';
            }
        }
    }

    function createElement(tagName, ...className) {
        let newElement = document.createElement(tagName);
        className.forEach(c => newElement.classList.add(c));
        return newElement;
    }
}

solution();