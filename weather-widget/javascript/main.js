// access elements in the DOM
let input = document.querySelector(".zipcode");
let btn = document.querySelector(".search-button");
let form = document.querySelector("form");

// the spots where we will show the weather
let CITY_NAME = document.querySelector(".city_name");
let CITY_TEMP = document.querySelector(".temperature");
let image = document.querySelector("img");

// this function gets the weather for the zipcode we give it
const getWeatherData = (zip) => {
  let API_KEY = config.WEATHER_API_KEY;
  let API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=${API_KEY}`;

  fetch(API_ENDPOINT)
    .then((response) => response.json())
    .then((data) => {
      // save the weather data in a variable
      let local_weather_data = data;

      // put the city name on the page
      CITY_NAME.textContent = local_weather_data.name;

      // the temperature comes in kelvin so change it to celsius
      let weather_in_celsius = Math.round(local_weather_data.main.temp - 273);
      // put the temperature on the page
      CITY_TEMP.textContent = weather_in_celsius + " C";

      // get the weather icon code and show the matching picture
      let WEATHER_ICON = local_weather_data.weather[0].icon;
      image.setAttribute("src", `https://openweathermap.org/img/wn/${WEATHER_ICON}@2x.png`);
    });

  // clear the input box and put the cursor back in it
  form.reset();
  input.focus();
};

// this runs when the search button is clicked
const getZipcode = (e) => {
  e.preventDefault();
  // get what the user typed in the box
  let ZIP_CODE = input.value;
  // use that zipcode to get the weather
  getWeatherData(ZIP_CODE);
};

// listen for a click on the search button
btn.addEventListener("click", getZipcode);
