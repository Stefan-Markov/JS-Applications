function solve() {

    if (localStorage.getItem('userAccessToken')) {
        document.location.href = '/homeLogged.html';
    }

    const url = 'http://localhost:3030/data/furniture';

    fetch(url)
        .then(responce => responce.json())
        .then(data => {
            Object.values(data).forEach(displayFurniture);
        })
        .catch();

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
        marketEl.setAttribute('disabled', true);

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
}

window.addEventListener('DOMContentLoaded', solve);