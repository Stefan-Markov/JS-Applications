function init() {

    document.querySelector('form').addEventListener('submit', addFurniture);
    document.getElementById('buyButton').addEventListener('click', buyFurniture);
    document.querySelector('div.orders button').addEventListener('click', showAllOrders);

    const url = 'http://localhost:3030/data/furniture';

    fetch(url)
        .then(responce => responce.json())
        .then(data => {
            Object.values(data).forEach(displayFurniture);
        })
        .catch();

    function addFurniture(e) {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name');
        const price = Number(formData.get('price'));
        const decorationFactor = Number(formData.get('factor'));
        const image = formData.get('img');

        if (name && (price && !isNaN(price)) && (decorationFactor && !isNaN(decorationFactor)) && image) {

            const furniture = { name, price, decorationFactor, image };
            const url = 'http://localhost:3030/data/furniture';
            fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Authorization': getAuthTocken(),
                    },
                    body: JSON.stringify(furniture),
                })
                .then(() => displayFurniture(furniture))
                .catch();
        }
    }

    function displayFurniture(furniture) {
        const currentTr = document.createElement('tr');

        const imgHolder = document.createElement('td');
        const namePHolder = document.createElement('td');
        const pricePHolder = document.createElement('td');
        const decorationFactorPHolder = document.createElement('td');
        const marketCheckboxHolder = document.createElement('td');

        const imgEl = document.createElement('img');
        const nameEl = document.createElement('p');
        const priceEl = document.createElement('p');
        const decorationFactorEl = document.createElement('p');
        const marketEl = document.createElement('input');

        imgEl.src = furniture.image;
        nameEl.textContent = furniture.name;
        priceEl.textContent = furniture.price;
        decorationFactorEl.textContent = furniture.decorationFactor;
        marketEl.setAttribute('type', 'checkbox');

        currentTr.appendChild(imgHolder);
        currentTr.appendChild(namePHolder);
        currentTr.appendChild(pricePHolder);
        currentTr.appendChild(decorationFactorPHolder);
        currentTr.appendChild(marketCheckboxHolder);

        imgHolder.appendChild(imgEl);
        namePHolder.appendChild(nameEl);
        pricePHolder.appendChild(priceEl);
        decorationFactorPHolder.appendChild(decorationFactorEl);
        marketCheckboxHolder.appendChild(marketEl);

        document.querySelector('table.table tbody').appendChild(currentTr);
    }

    function buyFurniture() {
        const orderedFurniture = Array.from(document.querySelectorAll('table.table tbody tr'))
            .filter(x => x.querySelector('input[type=checkbox]').checked);

        const url = 'http://localhost:3030/data/orders';

        orderedFurniture.forEach(furniture => {
            const name = furniture.querySelector('td:nth-of-type(2) p').textContent;
            const price = Number(furniture.querySelector('td:nth-of-type(3) p').textContent);

            fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Authorization': getAuthTocken(),
                    },
                    body: JSON.stringify({ name, price }),
                })
                .catch();
        });
    }

    function showAllOrders() {
        const url = `http://localhost:3030/data/orders?where=_ownerId%3D"${localStorage.getItem('userId')}"`;
        fetch(url, {
                method: 'GET',
                headers: { 'X-Authorization': getAuthTocken() },
            })
            .then(responce => responce.json())
            .then(data => {
                document.querySelector('div.orders p span').textContent = data.map(order => order.name).join(', ');
                document.querySelector('div.orders p:nth-of-type(2) span').textContent =
                    data.reduce((sum, order) => sum + order.price, 0) + ' $';
            })
            .catch();
    }
}

function logOut() {
    const url = 'http://localhost:3030/users/logout';
    fetch(url, {
            method: 'GET',
            headers: { 'X-Authorization': getAuthTocken() },
        })
        .then(() => {
            localStorage.removeItem('userAccessToken');
            document.location.href = '/home.html';
        })
        .catch();
}

function getAuthTocken() {
    return localStorage.getItem('userAccessToken');
}

window.addEventListener('DOMContentLoaded', init);