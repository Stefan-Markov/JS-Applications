function attachEvents() {
    let locationInput = document.getElementById('location');
    let getWeatherButton = document.getElementById('submit');

    let locationsBaseUrl = 'http://localhost:3030/jsonstore/forecaster/locations';
    let todayForecastBaseUrl = 'http://localhost:3030/jsonstore/forecaster/today/';
    let threeDayForecastBaseUrl = 'http://localhost:3030/jsonstore/forecaster/upcoming/';

    let mainForecastDiv = document.getElementById('forecast');
    let currentConditionsDiv = document.getElementById('current');
    let upcomingConditionsDiv = document.getElementById('upcoming');
    let city = '';

    getWeatherButton.addEventListener('click', getWeather);

    function getWeather() {

        clearForecastsDivs();

        fetch(`${locationsBaseUrl}`)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
            })
            .then(data => {
                city = data.find(c => c.name === locationInput.value);
                if (city) {
                    return fetch(`${todayForecastBaseUrl}${city.code}`)
                }
            })
            .then(res => res.json())
            .then(data => {
                showWeather(data, currentConditionsDiv, 'current');
                return fetch(`${threeDayForecastBaseUrl}${city.code}`);
            })
            .then(res => res.json())
            .then(data => {
                showWeather(data, upcomingConditionsDiv, 'upcoming');
                locationInput.value = '';
            })
            .catch(error => {
                locationInput.value = '';
                showErrorMessage();
                throw new Error(error);
            });


        function showWeather(data, conditionDiv, showCase) {
            let forecastsInfoDiv = document.createElement('div');

            if (showCase === 'current') {
                let conditionSpan = document.createElement('span');
                let symbolSpan = document.createElement('span');
                let cityNameForecastData = document.createElement('span');
                let temperatureForecastData = document.createElement('span');
                let conditionForecastData = document.createElement('span');
                let temperatureString = '';

                forecastsInfoDiv.classList.add('forecasts');
                symbolSpan.classList.add('condition', 'symbol');
                symbolSpan.textContent = getWeatherSymbol(data.forecast.condition);
                conditionSpan.classList.add('condition');
                cityNameForecastData.textContent = data.name;
                temperatureString = `${data.forecast.low}\u00B0/${data.forecast.high}\u00B0`;
                temperatureForecastData.textContent = temperatureString;
                conditionForecastData.textContent = data.forecast.condition;

                let spanData = [cityNameForecastData, temperatureForecastData, conditionForecastData];

                setForecastDataClassToSpans(spanData);

                appendCurrentDataSpansToConditionSpan(conditionSpan, spanData);

                appendCurrentSpansToForecastsDiv(forecastsInfoDiv, symbolSpan, conditionSpan);

                conditionDiv.appendChild(forecastsInfoDiv);

                mainForecastDiv.style.display = 'block';

            } else if (showCase === 'upcoming') {

                forecastsInfoDiv.classList.add('forecast-info');

                data.forecast.forEach(element => {
                    let conditionSpan = document.createElement('span');
                    let symbolSpan = document.createElement('span');
                    let temperatureForecastData = document.createElement('span');
                    let conditionForecastData = document.createElement('span');
                    let temperatureString = '';

                    symbolSpan.classList.add('symbol');
                    symbolSpan.textContent = getWeatherSymbol(element.condition);
                    conditionSpan.classList.add('upcoming');
                    temperatureString = `${element.low}\u00B0/${element.high}\u00B0`;
                    temperatureForecastData.textContent = temperatureString;
                    conditionForecastData.textContent = element.condition;

                    let spanData = [symbolSpan, temperatureForecastData, conditionForecastData];

                    setForecastDataClassToSpans(spanData);

                    appendCurrentDataSpansToConditionSpan(conditionSpan, spanData);

                    appendCurrentSpansToForecastsDiv(forecastsInfoDiv, conditionSpan);

                });

                conditionDiv.appendChild(forecastsInfoDiv);

                mainForecastDiv.style.display = 'block';
            }

        }

        function appendCurrentSpansToForecastsDiv(div, ...spans) {
            spans.forEach(span => {
                div.appendChild(span);
            })
        }

        function appendCurrentDataSpansToConditionSpan(span, spanData) {

            spanData.forEach(element => {
                span.appendChild(element);
            })
        }

        function setForecastDataClassToSpans(spanData) {
            spanData.forEach(element => {
                element.classList.add('forecast-data');
            });
        }

        function clearForecastsDivs() {
            let currentForecastsDiv = document.querySelector('div.forecasts');
            let upcommingForecastsDiv = document.querySelector('div.forecast-info');

            if (currentForecastsDiv && upcommingForecastsDiv) {
                while (currentForecastsDiv.firstChild) {
                    currentForecastsDiv.firstChild.remove();
                }

                while (upcommingForecastsDiv.firstChild) {
                    upcommingForecastsDiv.firstChild.remove();
                }

                currentConditionsDiv.removeChild(currentForecastsDiv);
                upcomingConditionsDiv.removeChild(upcommingForecastsDiv);
            }
            //Clear error message if it exists
            let errorMessage = mainForecastDiv.querySelector('#error-message');
            if (errorMessage) {
                mainForecastDiv.removeChild(errorMessage);
            }
        }

        function showErrorMessage() {
            let errorMessage = document.createElement('p');
            errorMessage.id = 'error-message';
            errorMessage.textContent = 'Error';
            mainForecastDiv.appendChild(errorMessage);
            mainForecastDiv.style.display = 'block';
        }

        function getWeatherSymbol(weatherCondition) {
            let symbolCode;

            switch (weatherCondition) {
                case 'Sunny':
                    symbolCode = '\u2600';
                    break;
                case 'Partly sunny':
                    symbolCode = '\u26C5';
                    break;
                case 'Overcast':
                    symbolCode = '\u2601';
                    break;
                case 'Rain':
                    symbolCode = '\u2601';
                    break;
                default:
                    break;
            }

            return symbolCode;
        }
    };
}

attachEvents();