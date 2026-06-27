// check that the javascript is working
console.log("this works");

// get my api key from the config file so it stays secret
const API_KEY = config.WEATHER_API_KEY;

// this function asks open weather map for the weather and prints it
function getWeatherData() {
  fetch(`http://api.openweathermap.org/data/2.5/weather?zip=10128&APPID=${API_KEY}`)
    .then(response => response.json())
    .then(data => console.log(data));
}

// run the function
getWeatherData()
