function attachEvents() {
    const locationBaseUrl = 'http://localhost:3030/jsonstore/forecaster/locations';
    const todayBaseUrl = 'http://localhost:3030/jsonstore/forecaster/today/';
    const upcomingBaseUrl = 'http://localhost:3030/jsonstore/forecaster/upcoming/';

    let degreeSymbol = String.fromCharCode(176);

    let weatherSymbols = {
        'Sunny': `\u2600`,
        'Partly sunny': '\u{26C5}',
        'Overcast': '\u2601',
        'Rain': '\u2614',
    };

    let locationInputElement = document.querySelector('#location');
    let submitBtnElement = document.querySelector('#submit');

    let forecastDivElement = document.querySelector('#forecast');
    let currentWeatherDivElement = document.querySelector('#current');
    let upcomingWeatherDivElement = document.querySelector('#upcoming');

    submitBtnElement.addEventListener('click', () => {

        let searchedCity = locationInputElement.value;
        forecastDivElement.style.display = 'block';
        let code = '';

        if (currentWeatherDivElement.children.length > 1) {
            currentWeatherDivElement.lastChild.remove();
        }
        if (upcomingWeatherDivElement.children.length > 1) {
            upcomingWeatherDivElement.lastChild.remove();
        }

        fetch(locationBaseUrl)
            .then(response => response.json())
            .then(data => {
                for (const locationData of data) {
                    if (searchedCity == locationData.name) {
                        code = locationData.code;
                        break;
                    }
                }
                return fetch(`${todayBaseUrl}${code}`);
            })
            .then(response => response.json())
            .then(data => {

                let forecastDiv = document.createElement('div');
                forecastDiv.classList.add('forecasts');


                let conditionSymbolSpan = document.createElement('span');
                conditionSymbolSpan.classList.add('condition', 'symbol');
                let condition = data.forecast.condition;
                conditionSymbolSpan.textContent = weatherSymbols[condition];

                let parentSpan = document.createElement('span');
                parentSpan.classList.add('condition');

                let cityNameSpan = document.createElement('span');
                cityNameSpan.classList.add('forecast-data');
                cityNameSpan.textContent = data.name;

                let temperatureSpan = document.createElement('span');
                temperatureSpan.classList.add('forecast-data');
                temperatureSpan.textContent = `${data.forecast.low}${degreeSymbol}/${data.forecast.high}${degreeSymbol}`;

                let conditionSpan = document.createElement('span');
                conditionSpan.classList.add('forecast-data');
                conditionSpan.textContent = condition;

                parentSpan.appendChild(cityNameSpan);
                parentSpan.appendChild(temperatureSpan);
                parentSpan.appendChild(conditionSpan);

                forecastDiv.appendChild(conditionSymbolSpan);
                forecastDiv.appendChild(parentSpan);

                currentWeatherDivElement.appendChild(forecastDiv);
                return fetch(`${upcomingBaseUrl}${code}`);
            })
            .then(response => response.json())
            .then(data => {

                let forecastInfoDiv = document.createElement('div');
                forecastInfoDiv.classList.add('forecast-info');

                for (const weather of data.forecast) {
                    let spanUpcoming = document.createElement('span');
                    spanUpcoming.classList.add('upcoming');

                    let symbolSpan = document.createElement('span');
                    symbolSpan.classList.add('symbol');
                    symbolSpan.textContent = weatherSymbols[weather.condition]

                    let tempSpan = document.createElement('span');
                    tempSpan.classList.add('forecast-data');
                    tempSpan.textContent = `${weather.low}${degreeSymbol}/${weather.high}${degreeSymbol}`;

                    let conditionSpan = document.createElement('span');
                    conditionSpan.classList.add('forecast-data');
                    conditionSpan.textContent = weather.condition;

                    spanUpcoming.appendChild(symbolSpan);
                    spanUpcoming.appendChild(tempSpan);
                    spanUpcoming.appendChild(conditionSpan);

                    forecastInfoDiv.appendChild(spanUpcoming);
                }


                upcomingWeatherDivElement.appendChild(forecastInfoDiv);
            })
            .catch(error => {

                let forecastDiv = document.createElement('div');
                forecastDiv.textContent = 'Error';

                currentWeatherDivElement.appendChild(forecastDiv);

            })


            function clear(){
                let currentElement = Array.from(document.querySelectorAll('#current'));
            }

    });
}

attachEvents();