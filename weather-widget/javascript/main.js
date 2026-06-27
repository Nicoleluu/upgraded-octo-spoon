// grab the input box and the search button from the page
let input = document.querySelector(".zipcode");
let btn = document.querySelector(".search-button");

// this function gets the weather for the zipcode we give it
getWeatherData = (zip) => {
  let API_KEY = config.WEATHER_API_KEY;
  let API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&APPID=${API_KEY}`;

  fetch(API_ENDPOINT)
    .then((response) => response.json())
    .then((data) => {
      // save the weather data in a variable
      let local_weather_data = data;
      // show it in the console
      console.log(local_weather_data);
    });
};

// this runs when the search button is clicked
const getZipCode = (e) => {
  e.preventDefault();
  // get what the user typed in the box
  let ZIP_CODE = input.value;
  // use that zipcode to get the weather
  getWeatherData(ZIP_CODE);
};

// listen for a click on the search button
btn.addEventListener("click", getZipCode);
