function refreshWeather(res) {
  let temperatureElement = document.querySelector("#current-temperature");
  let cityElement = document.querySelector("#current-city");
  let descriptionElement = document.getElementById("description");
  let humidityElement = document.getElementById("humidity");
  let windElement = document.getElementById("wind");
  let iconElement = document.getElementById("icon");
  let currentDateELement = document.querySelector("#current-date");

  let currentDate = new Date(res.data.time * 1000);

  currentDateELement.innerHTML = formatDate(currentDate);

  let temperature = Math.round(res.data.temperature.current);
  let humidity = `${res.data.temperature.humidity}%`;
  let wind = `${res.data.wind.speed}km/h`;
  let iconWeatherCity = res.data.condition.icon_url;

  cityElement.innerHTML = res.data.city;
  temperatureElement.innerHTML = temperature;
  descriptionElement.innerHTML = res.data.condition.description;
  humidityElement.innerHTML = humidity;
  windElement.innerHTML = wind;
  iconElement.innerHTML = `<img
              src="${iconWeatherCity}"
              alt="The Weather icon"
            />`;
  getFourcast(res.data.city);
}

function searchCity(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(refreshWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");

  searchCity(searchInputElement.value);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

searchCity("Kyiv");

function displayForecast(res) {
  console.log(res.data.daily);
  let forecastElement = document.getElementById("forecast");

  forecastElement.innerHTML = `
<div class="forecast-day">Tue</div>
        <img src="" alt="">
        <div class="forecast-temperature">
          <span class="forecast-temperature-max"></span>
          <span class="forecast-temperature-min"></span>
        </div>
`;
}

function getFourcast(city) {
  apiKey = "8907b2tf0b29bfcd0b41134b5b1c6ao9";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;

  axios.get(apiUrl).then(displayForecast);
}
