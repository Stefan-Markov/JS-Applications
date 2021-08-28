function attachEvents() {
  let submitBtn = document.getElementById("submit");
  let locationField = document.getElementById("location");
  let forecastField = document.getElementById("forecast");

  //attach event
  submitBtn.addEventListener("click", weatherHandler);
  let conditions = {
    Sunny: () => "☀",
    "Partly sunny": () => "⛅",
    Overcast: () => "☁",
    Rain: () => "☂",
  };

  function weatherHandler(e) {
    //fetch the data and work with the response in the weather handler
    e.preventDefault();

    let baseUrl = "http://localhost:3030/jsonstore/forecaster/locations";

    fetch(`${baseUrl}`)
      .then((res) => res.json())
      .then((locations) => {
        // console.log(locations);
        //use find() to select the location name -> return other nested fetch/then {location.code, current report}
        let location = locations.find((el) => el.name === locationField.value);
        forecastField.style.display = "block";

        let currentForecastContainer = document.querySelector("#current");
        Array.from(currentForecastContainer.querySelectorAll("div")).forEach(
          (el, i) => {
            i !== 0 ? el.remove() : el;
          }
        );
        let upcomingForecastContainer = document.querySelector("#upcoming");
        Array.from(upcomingForecastContainer.querySelectorAll("div")).forEach(
          (el, i) => {
            i !== 0 ? el.remove() : el;
          }
        );
        

        fetch(
          `http://localhost:3030/jsonstore/forecaster/today/${location.code}`
        )
          .then((res) => res.json())
          .then((currentWeather) => {
            // console.log(currentWeather.forecast);
            //create the current forecast structure HTML
            let currentDiv = document.getElementById("current");
            let forecastsDiv = document.createElement("div");
            forecastsDiv.classList.add("forecasts");
            currentDiv.appendChild(forecastsDiv);

            let spanConditionSymbol = document.createElement("span");
            spanConditionSymbol.classList.add("condition", "symbol");
            spanConditionSymbol.textContent =
              conditions[currentWeather.forecast.condition]();
            let spanCondition = document.createElement("span");
            spanCondition.classList.add("condition");
            forecastsDiv.appendChild(spanConditionSymbol);
            forecastsDiv.appendChild(spanCondition);

            let spanLocation = document.createElement("span");
            spanLocation.classList.add("forecast-data");
            spanLocation.textContent = currentWeather.name;
            let spanDeg = document.createElement("span");
            spanDeg.classList.add("forecast-data");
            spanDeg.textContent = `${currentWeather.forecast.low}°/${currentWeather.forecast.high}°`;
            let spanCondString = document.createElement("span");
            spanCondString.classList.add("forecast-data");
            spanCondString.textContent = currentWeather.forecast.condition;
            spanCondition.appendChild(spanLocation);
            spanCondition.appendChild(spanDeg);
            spanCondition.appendChild(spanCondString);
          });

        fetch(
          `http://localhost:3030/jsonstore/forecaster/upcoming/${location.code}`
        )
          .then((res) => res.json())
          .then((upcomingWeather) => {
            // console.log(upcomingWeather);
            //create the upcoming forecast structure HTML
            let upcomingDiv = document.getElementById("upcoming");
            let forecastInfoDiv = document.createElement("div");
            forecastInfoDiv.classList.add("forecast-info");
            upcomingDiv.appendChild(forecastInfoDiv);

            let firstDay = dailyReport(upcomingWeather.forecast[0]);
            let secondDay = dailyReport(upcomingWeather.forecast[1]);
            let thirdDay = dailyReport(upcomingWeather.forecast[2]);

            forecastInfoDiv.appendChild(firstDay);
            forecastInfoDiv.appendChild(secondDay);
            forecastInfoDiv.appendChild(thirdDay);
          });
      })
      .catch((error) => {
        let errorField = document.createElement("div");
        errorField.classList.add("label", "error");
        errorField.textContent = `Error`;
        errorField.style.textAlign = "center";
        forecastField.appendChild(errorField); // how to clear the error field
      });
  }

  function dailyReport(forecast) {
    let spanUpcoming = document.createElement("span");
    spanUpcoming.classList.add("upcoming");

    let spanSymbol = document.createElement("span");
    spanSymbol.classList.add("symbol");
    spanSymbol.textContent = conditions[forecast.condition]();

    let spanDeg = document.createElement("span");
    spanDeg.classList.add("forecast-data");
    spanDeg.textContent = `${forecast.low}°/${forecast.high}°`;

    let spanCondString = document.createElement("span");
    spanCondString.classList.add("forecast-data");
    spanCondString.textContent = forecast.condition;

    spanUpcoming.appendChild(spanSymbol);
    spanUpcoming.appendChild(spanDeg);
    spanUpcoming.appendChild(spanCondString);
    return spanUpcoming;
  }
}

attachEvents();
//can be with 2 fetches after each other today - upcoming; Promise.all().then(display)
