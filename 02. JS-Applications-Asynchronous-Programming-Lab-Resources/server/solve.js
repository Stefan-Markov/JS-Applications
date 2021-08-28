function solve() {
    const urlRecipes = 'http://localhost:3030/jsonstore/cookbook/recipes';
    const main = document.querySelector('main');
    main.innerHTML = '';

    fetch(urlRecipes)
        .then(response => response.json())
        .then(x => {
            Object.values(x).forEach(x => {
                const articleBlk =
                    el('article', null, {class: "preview"},
                        el('div', null, {class: "title"},
                            el('h2', x.name)
                        ),
                        el('div', null, {class: "small"},
                            el('img', null, {src: x.img})
                        )
                    )
                articleBlk.addEventListener('click', () => moreInfo(x._id, articleBlk))
                main.appendChild(articleBlk);
            });
        });

    function moreInfo(id, preview) {
        const urlMoreInfo = `http://localhost:3030/jsonstore/cookbook/details/${id}`;
        fetch(urlMoreInfo)
            .then(resp => resp.json())
            .then(r => {
                const articleBlk =
                    el('article', null, null,
                        el('h2', r.name),
                        el('div', null, {class: 'band'},
                            el('div', null, {class: 'thumb'},
                                el('img', null, {src: r.img})
                            ),
                            el('div', null, {class: 'ingredients'},
                                el('h3', 'Ingredients:'),
                                el('ul', null, null, ...arrInfo(r.ingredients)
                                )
                            ),
                        ),
                        el('div', null, {class: 'description'},
                            el('h3', 'Preparation:'),
                            ...arrInfo(r.steps)
                        )
                    );
                articleBlk.addEventListener('click', () => {
                    articleBlk.replaceWith(preview)
                })
                preview.replaceWith(articleBlk)
            });
    }

    function arrInfo(arr) {
        let result = [];
        arr.forEach(x => {
            result.push(el('li', x));
        })
        return result;
    }

    function el(type = '', content = '', attributesObj = {}, ...nestedElements) {
        let result = document.createElement(type);

        if (content === 0 || content) {
            result.textContent = content;
        }

        if (attributesObj) {
            for (const key in attributesObj) {
                if (key === 'class') {
                    if (Array.isArray(attributesObj[key])) {
                        result.classList.add(...attributesObj[key]);
                    } else {
                        result.classList.add(attributesObj[key]);
                    }
                } else {
                    result.setAttribute(key, attributesObj[key]);
                }
            }
        }

        if (nestedElements) {
            nestedElements.forEach(x => result.appendChild(x));
        }
        return result;
    }
}