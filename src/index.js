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

// function refreshWeather(response) {
//   let temperatureElement = document.querySelector("#temperature");
//   let temperature = response.data.temperature.current;
//   let cityElement = document.querySelector("#city");
//   let descriptionElement = document.querySelector("#description");
//   let humidityElement = document.querySelector("#humidity");
//   let windSpeedElement = document.querySelector("#wind-speed");
//   let timeElement = document.querySelector("#time");
//   let date = new Date(response.data.time * 1000);
//   let iconElement = document.querySelector("#icon");

//   cityElement.innerHTML = response.data.city;
//   timeElement.innerHTML = formatDate(date);
//   descriptionElement.innerHTML = response.data.condition.description;
//   humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
//   windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
//   temperatureElement.innerHTML = Math.round(temperature);
//   iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;
// }

// function formatDate(date) {
//   let minutes = date.getMinutes();
//   let hours = date.getHours();
//   let days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   let day = days[date.getDay()];

//   if (minutes < 10) {
//     minutes = `0${minutes}`;
//   }

//   return `${day} ${hours}:${minutes}`;
// }

// function searchCity(city) {
//   let apiKey = "b2a5adcct04b33178913oc335f405433";
//   let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
//   axios.get(apiUrl).then(refreshWeather);
// }

// function handleSearchSubmit(event) {
//   event.preventDefault();
//   let searchInput = document.querySelector("#search-form-input");

//   searchCity(searchInput.value);
// }

// let searchFormElement = document.querySelector("#search-form");
// searchFormElement.addEventListener("submit", handleSearchSubmit);

// searchCity("Paris");
