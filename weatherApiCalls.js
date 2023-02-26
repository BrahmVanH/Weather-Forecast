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
    
    if(browserLatitude.toString().slice(0,1) === '-' || browserLatitude.toString().slice(0,1) === '+') {
        var reducedDecimalLatitude = browserLatitude.toString().slice(0, 8);
    } else {
        var reducedDecimalLatitude = browserLatitude.toString().slice(0, 7);
    };

    if(browserLongitude.toString().slice(0, 1) === '-' || browserLongitude.toString().slice(0,1) === '+') {
        var reducedDecimalLongitude = browserLongitude.toString().slice(0, 8);
    } else {
        var reducedDecimalLongitude = browserLongitude.toString().slice(0, 7);
    };
    const browserLatitudeLongitude = `${reducedDecimalLatitude},${reducedDecimalLongitude}`;
    
    console.log(`formatted browser location: ${browserLatitudeLongitude}`);  
    getCurrentWeather(browserLatitudeLongitude);
}

const getCurrentWeather = (userLocation) => {
    
    forecastEndpoint = `/forecast.json?key=222a7016242f4bf6b57214612232502&q=${userLocation}&days=10`;

    console.log(`fetching 10 day forecast...`);

    forecastFetchUrl = `${weatherApiUrl}${forecastEndpoint}`;

    fetch(forecastFetchUrl)
        .then(function(response) {
            console.log(`response received`);
            return response.json();
        })
        .then(function(data) {
            console.log(`10 day forecast for ${userLocation}`);
            console.log(data);
            handleCurrentWeather(data.current);
            handleIndividualDayForecast(data.forecastday);
        })
}

const handleCurrentWeather = (currentForecast) => {

    currentForecast.condition.icon //Current condition icon ie "cdn.weather.../night/..."
    currentForecast.condition.text //current condition text ie "clear"
    currentForecast.feelslike_c //Current "feel" temp. Weird that it's not camelCase
    currentForecast.feelslike_f 
    currentForecast.gust_kph 
    currentForecast.gust_mph
    currentForecast.currentHumidity
    currentForecast.is_day // Binary 
    currentForecast.last_updated //"xxxx-xx-xx xx:xx"
    currentForecast.precip_in
    currentForecast.precip_mm
    currentForecast.pressure_in //pressure in inches
    currentForecast.pressure_mb //Pressure in millibar
    currentForecast.temp_c 
    currentForecast.temp_f
    currentForecast.wind_dir // "ssw" cardinal wind direction
    currentForecast.wind_kph
    currentForecast.wind_mph


}

const handleIndividualDayForecast = (forecastDays) => {

        for(const day of forecastDays) {
        sunriseTime = day.astro.sunrise //sunrise time "xx:xx xM"
        sunsetTime = day.astro.sunset //sunset time ^^
        dayOfWeek = new Date(day.date).getDay();
        avgHumidity = day.day.avghumidity;
        avgTempC = day.day.avgtemp_c;
        avgTempF = day.day.avgtemp_f;
        conditionIconUrl = day.day.condition;
        conditionIcon = day.day.condition.text //"cloudy"
        maxTempC = day.day.maxtemp_c;
        maxTempF = day.day.maxtemp_f;
        maxWindKph = day.day.maxwind_kph;
        maxWindMph = day.day.maxwind_mph;
        minTempC = day.day.mintemp_c;
        minTempF = day.day.mintemp_f;
       // uvIndex = day.day.uv make an animated image for this
        
    //  isGoingToSnow()... day.day.daily_will_it_snow .. if(yes)... day.day.daily_chance_of_snow ...if(yes) day.day.totalsnow_cm (convert to imperial when needed);
    //  isGoingToRain()... day.day.daily_will_it_rain ... if(yes)... day.day.daily_chance_of_rain ...if(yes)  day.day.totalprecip_in/day.day.totalprecip_mm
    // Option to add hourly information too. 
        const extendedForecastCard = document.createElement('div class=forecast card col');
        const forecastDayOfWeek = document.createElement('h2');
        const forecastWeatherIcon = document.createElement('img');
        const forecastTemperatureEl

    }

    console.log()
}




const handleTenDayWeather = (tenDayForecast) => {

    
    tenDayForecast.condition.icon //Current condition icon ie "cdn.weather.../night/..."
    tenDayForecast.condition.text //current condition text ie "clear"
    tenDayForecast.feelslike_c //Current "feel" temp. Weird that it's not camelCase
    tenDayForecast.feelslike_f 
    tenDayForecast.gust_kph 
    tenDayForecast.gust_mph
    tenDayForecast.currentHumidity
    tenDayForecast.is_day // Binary 
    tenDayForecast.last_updated //"xxxx-xx-xx xx:xx"
    tenDayForecast.precip_in
    tenDayForecast.precip_mm
    tenDayForecast.pressure_in //pressure in inches
    tenDayForecast.pressure_mb //Pressure in millibar
    tenDayForecast.temp_c 
    tenDayForecast.temp_f
    tenDayForecast.wind_dir // "ssw" cardinal wind direction
    tenDayForecast.wind_kph
    tenDayForecast.wind_mph
}

getBrowserLocation();

// Include this later on. Use it to populate a dropdown menu of auto-completed city/area names
//const searchEndpoint = 'search.json';

//ADD WEATHER ALERTS IN *ALTERTY* COLOR AT TOP

