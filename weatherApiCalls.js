const currentDate = new Date()
const currentDateIso = currentDate.toISOString();
const currentDateUser = currentDate.toString();

const dateEl = document.getElementById('date');
const currentTempEl = document.getElementById('currentTemp');
const currentHighLowTempEl = document.getElementById('currentHighLowTemp');
const currentTempFeelEl = document.getElementById('currentTempFeel');
const currentWindEl = document.getElementById('currentWind');
const currentHumidity = document.getElementById('currentHumidity');
const currentWeatherIcon = document.getElementById('currentWeatherImage');

// WeatherAPI request url/endpoint
const weatherApiUrl = 'https://api.weatherapi.com/v1'
const forecastEndpoint = `/forecast.json?key=222a7016242f4bf6b57214612232502?q=${userLocation}days=10`;

console.log(currentDateUser);
console.log(currentDateIso);

const getBrowserLocation = () => {
    
    console.log('getting browser location...');

    navigator.geolocation.getCurrentPosition(position => {
       
        const { latitude, longitude } = position.coords;
        console.log(`browser location: ${latitude}, ${longitude}`);
        formatBrowserLocation(latitude, longitude);
     
    });
};

const formatBrowserLocation = (browserLatitude, browserLongitude) => {
    
    const browserLatitudeLongitude = `${browserLatitude}${browserLongitude}`;
    return browserLatitudeLongitude;
}

const getCurrentWeather = () => {
    
    console.log(`fetching 10 day forecast...`);

    forecastFetchUrl = `${weatherApiUrl}${forecastEndpoint}`;

    fetch(forecastFetchUrl)
        .then(function(response) {
            console.log(`response received`);
            return response.json();
        })
        .then(function(data) {
            console.log(`10 day forecast for ${userLocation}`);
        })
}



// Include this later on. Use it to populate a dropdown menu of auto-completed city/area names
//const searchEndpoint = 'search.json';