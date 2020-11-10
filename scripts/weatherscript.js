// SELECT ELEMENTS
const iconElement = document.querySelector(".weather-icon");
const tempElement = document.querySelector(".temperature-value p");
//const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
//const feels_likeElement = document.querySelector(".feels_like p");
const notificationElement = document.querySelector(".notification");

// App data
const weather = {};

weather.temperature = {
    unit : "fahrenheit"
}

// APP CONSTS AND VARS
const KELVIN = 273;
// API KEY
const key = "5bd54ec183eddc206fb341f533e2e7b3";

// CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
   
   
    var pos = {lat: 36.114647, lng: -115.172813};
    let latitude = pos.coords.latitude;
    let longitude = pos.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SET USER'S POSITION
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    
    getWeather(latitude, longitude);
}

// SHOW ERROR WHEN THERE IS AN ISSUE WITH GEOLOCATION SERVICE
function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// http://api.openweathermap.org/data/2.5/forecast/city?id=524901&APPID=410463b3935acea56c8171825dbb4440
// GET WEATHER FROM API PROVIDER
function getWeather(latitude, longitude){
     // let apiKey = "5bd54ec183eddc206fb341f533e2e7b3";
   // let city = "Lisbon,pt";api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={your api key}
    //let url = `https://api.openweathermap.org/data/2.5/weather? 
    //q=${city}&appid=${apiKey}&units=metric`;
 
    let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    //let api = `https://api.openweathermap.org/data/2.5/weather?lat=36.114647&long=-115.172813&appid=5bd54ec183eddc206fb341f533e2e7b3`;

    fetch(api)
        .then(function(response){
            let data = response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value = ((Math.floor(data.main.temp - KELVIN) * 9/5) + 32);
            //weather.description = data.weather[0].description;
            weather.iconId = data.weather[0].icon;
            weather.city = data.name;
            weather.country = data.sys.country;
           // weather.feels_like = ((Math.floor(data.main.feels_like - KELVIN) * 9/5) + 32);
        })
        .then(function(){
            displayWeather();
        });
        
}

// DISPLAY WEATHER TO UI
function displayWeather(){
    iconElement.innerHTML = `<img src="img/icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>F</span>`;
   // descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
   // feels_likeElement.innerHTML = `<span>Feels Like </span>${weather.feels_like}°<span>F</span>`;
}

// C to F conversion
function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}
