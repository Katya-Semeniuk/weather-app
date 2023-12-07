const apiKey = "8907b2tf0b29bfcd0b41134b5b1c6ao9";
const API = "https://api.shecodes.io/weather/v1/current?";

let searchInputElement = document.querySelector("#search-input");
let cityElement = document.querySelector("#current-city");
let descriptionEl = document.getElementById("description");
let windEl = document.getElementById("wind");
let humidityEl = document.getElementById("humidity");
let temperatureValueEl = document.querySelector(".current-temperature-value");

function search(event) {
  event.preventDefault();
  let query = searchInputElement.value;

  axios
    .get(API, {
      params: {
        query: query,
        key: apiKey,
      },
    })
    .then(getCityInfo)
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {});
}

function getCityInfo(res) {
  const data = res.data;
  const city = data.city;
  const temperature = Math.round(data.temperature.current);
  const description = data.condition.description;
  let wind = data.wind.speed;
  let humidity = data.temperature.humidity;

  cityElement.innerHTML = city;
  descriptionEl.innerHTML = description;
  windEl.innerHTML = wind;
  humidityEl.innerHTML = humidity;
  temperatureValueEl.innerHTML = temperature;
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
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);
