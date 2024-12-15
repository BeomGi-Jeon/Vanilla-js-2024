const city = document.querySelector(".geolocation div:first-child span");
const weather = document.querySelector(".geolocation div:last-child span");

const API_KEY = "10f4ce2a2b5ac333cae9d2d50ff528b7";

function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const cityIcon=document.getElementById("city");
    const weatherIcon=document.getElementById("weather");

    cityIcon.style.visibility='visible';
    weatherIcon.style.visibility='visible';

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        city.innerText =` ${data.name}`;
        weather.innerText = ` ${data.weather[0].main}`;
      });
  }
  function onGeoError() {
    alert("Can't find you. No weather for you.");
  }
  
  navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);






