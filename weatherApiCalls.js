const currentDate = new Date()
const currentDateIso = currentDate.toISOString();
const currentDateUser = currentDate.toString();
const currentWeatherEl = document.getElementById('currentWeather');

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
// Heads up, WeatherAPI uses all lowercase for it's content names. 

const getCurrentWeather = (userLocation) => {
    
    forecastEndpoint = `/forecast.json?key=222a7016242f4bf6b57214612232502&q=${userLocation}&days=5`;

    console.log(`fetching 10 day forecast...`);

    forecastFetchUrl = `${weatherApiUrl}${forecastEndpoint}`;

    fetch(forecastFetchUrl)
        .then(function(response) {
            console.log(`response received`);
            return response.json();
        })
        .then(function(data) {
            console.log(`All data for next 10 days`);
            console.log(data);
            console.log(`5 day forecast for ${userLocation}`);
            console.log(data.forecast);
            console.log(`Current weather for ${userLocation}`);
            console.log(data.current);
          //  handleCurrentWeather(data.current);
            handleIndividualDayForecast(data.forecast.forecastday);
            handleTodaysWeatherData(data);
        })
}

const handleTodaysWeatherData = (fiveDayForecast) => {

    currentConditionsText = fiveDayForecast.current.condition.text; //current condition text ie "clear"
    currentFeelsLikeC = fiveDayForecast.current.feelslike_c //Current "feel" temp. Weird that it's not camelCase
    currentFeelsLikeF = fiveDayForecast.current.feelslike_f         
    currentGustKph = fiveDayForecast.current.gust_kph        
    currentGustMph = fiveDayForecast.current.gust_mph        
    currentHumidity = fiveDayForecast.current.currentHumidity     
    currentIsDayBin = fiveDayForecast.current.is_day // Binary        
    currentLastUpdateTime = fiveDayForecast.current.last_updated //"xxxx-xx-xx xx:xx"       
    currentPrecipInch = fiveDayForecast.current.precip_in       
    currentPrecipMilli = fiveDayForecast.current.precip_mm       
    currentPressureInch = fiveDayForecast.current.pressure_in //pressure in inches        
    currentPressureMilli = fiveDayForecast.current.pressure_mb //Pressure in millibar      
    currentTempC = fiveDayForecast.current.temp_c      
    currentTempF = fiveDayForecast.current.temp_f      
    currentWindDir = fiveDayForecast.current.wind_dir // "ssw" cardinal wind direction       
    currentWindKph = fiveDayForecast.current.wind_kph        
    currentWindMph = fiveDayForecast.current.wind_mph  
    todayHighTempC = fiveDayForecast.forecast.forecastday[0].day.maxtemp_c;
    todayHighTempF = fiveDayForecast.forecast.forecastday[0].day.maxtemp_f;
    todayLowTempC = fiveDayForecast.forecast.forecastday[0].day.mintemp_c;
    todayLowTempF = fiveDayForecast.forecast.forecastday[0].day.mintemp_f;
    willItSnow = fiveDayForecast.forecast.forecastday[0].day.daily_will_it_snow; //Binary
    willItRain = fiveDayForecast.forecast.forecastday[0].day.daily_will_it_rain; //Binary
 //   chanceOfPrecip = getChanceOfPrecip(willItRain, willItSnow);
    currentConditionsIconCode = fiveDayForecast.current.condition.icon.slice(-7, -4); //Current condition icon code
   // currentConditionsIconPath = dayOrNightIconSwitch(currentConditionsIconCode, currentIsDayBin, fiveDayForecast);

    const currentWeatherHtml = `
        <div class="col-md-4" style="padding: 12px;">
            <h1 style="font-size: .5em;">${currentDateUser}</h1>
            <p style="font-size: .5em;width: 100%;">${todayHighTempF}/${todayLowTempF}<br/>${currentTempF}°F<br/>Feels Like ${currentFeelsLikeF}</p>
            <p style="font-size: .5em;width: 100%;">${currentWindDir} @ ${currentWindMph} (${currentGustMph})</p>
            <p style="font-size: .5em;width: 100%;"></p>
            <p style="font-size: .5em;width: 100%;">$currentConditionsText}</p>
        </div>
        <div class="col-md-4" style="padding: 15px 12px;">
            <p style="font-size: .5em;width: 100%;" src="https:"></p>
            <p style="font-size: .5em;width: 100%;"> Chance of precipitation</p>
            <p style="font-size: .5em;width: 100%;">${currentHumidity}% humidity</p>
        </div>
        
    `
    
    console.log('passing current weather html to document');
    appendCurrentForecastHtml(currentWeatherHtml);


}

const getChanceOfPrecip = (willItRain, willItSnow, fiveDayForecast) => {
   
    if(willItRain === 1) {
        chanceOfPrecip = fiveDayForecast.forecast.forecastday[0].day.daily_chance_of_rain;
    } else if(willItSnow === 1) {
        chanceOfPrecip = fiveDayForecast.forecast.forecastday[0].day.daily_chance_of_snow;

    } else {
        chanceOfPrecip = '0';
    }

    return chanceOfPrecip;
}

const getNightConditionsIcon = (iconCode) => {

    currentConditionsIconPath = `./assets/images/night_icons/${iconCode}.svg`;
    
};

const getDayConditionsIcon = (iconCode) => {
    
    currentConditionsIconPath = `./assets/images/day_icons/${iconCode}.svg`;
    
};

const dayOrNightIconSwitch = (isDayBin, iconCode) => {

    switch (isDayBin) {
        case 0:
            console.log("getting night icons...");
            iconPath = getNightConditionsIcon(iconCode);
            break;
        case 1:
            console.log("getting day icons...");
            iconPath = getDayConditionsIcon(iconCode);
            break; 
    };  
};


const handleIndividualDayForecast = (forecastDays) => {

    
    for(const day of forecastDays) {
        sunriseTime = day.astro.sunrise //sunrise time "xx:xx xM"
        sunsetTime = day.astro.sunset //sunset time ^^
        dayDigitOfWeek = new Date(day.date).getDay();
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
        dayOfWeek = getDayOfWeek(dayDigitOfWeek);

       // uvIndex = day.day.uv make an animated image for this
        
    //  isGoingToSnow()... day.day.daily_will_it_snow .. if(yes)... day.day.daily_chance_of_snow ...if(yes) day.day.totalsnow_cm (convert to imperial when needed);
    //  isGoingToRain()... day.day.daily_will_it_rain ... if(yes)... day.day.daily_chance_of_rain ...if(yes)  day.day.totalprecip_in/day.day.totalprecip_mm
    // Option to add hourly information too. 
    

    const extendedForecastCard = `
        
        <div class="forecast card col">
            <div class="card-header">
                <h5 class="mb-0">${dayOfWeek}</h5>
            </div>
            <div class="card-body">
            <!--<img src="${conditionIcon}"></img>-->
                <p>${avgTempF}°F (${maxTempF}°/${minTempF}°)</p>
             <!--<p>*wind icon*Gotta call the api again to get wind info</p> -->
                <p>${avgHumidity}% Humidity</p>
                <p>Sunrise: ${sunriseTime}</p>
                <p>Sunset: ${sunsetTime}</p>    
            </div>
            <div class="card-footer"></div>
        </div>`  
       
        appendExtendedForecastHtml(extendedForecastCard);
    }


}

const getDayOfWeek = (dayDigitOfWeek) => {
    
    switch (dayDigitOfWeek) {
        case 0:
            dayOfWeek = "Sunday";
            break;
        case 1:
            dayOfWeek = "Saturday";
            break;
        case 2:
            dayOfWeek = "Friday";
            break;
        case 3:
            dayOfWeek = "Thursday";
            break;
        case 4:
            dayOfWeek = "Wednesday";
            break;
        case 5:
            dayOfWeek = "Tuesday";
            break;
        case 6:
            dayOfWeek = "Monday";
            break;
    }

    return dayOfWeek;
}

const appendExtendedForecastHtml = (extendedForecastHtml) => {

    const tenDayForecastEl = document.getElementById('tenDayForecast');
    tenDayForecastEl.insertAdjacentHTML("afterBegin", extendedForecastHtml);
    console.log('appending extended forecast...')

}

const appendCurrentForecastHtml = (currentWeatherHtml) => {

    console.log('appeding current weather...')
    currentWeatherEl.insertAdjacentHTML("afterBegin", currentWeatherHtml);
}


/*<div class=" forecast card col">
    <div class="card-header">
        <h5 class="mb-0">${dayOfWeek}</h5>
    </div>
    <div class="card-body">
    <!--<img src="${conditionIcon}"></img>-->
        <p>${avgTempF}°F (${maxTempF}°/${minTempF}°)</p>
        <p>*wind icon*Gotta call the api again to get wind info</p>
        <p>${avgHumidity}% Humidity</p>
        <p>Sunrise: ${sunriseTime}</p>
        <p>Sunset: ${sunsetTime}</p>    
    </div>
    <div class="card-footer"></div>
</div>*/

getBrowserLocation();

// Include this later on. Use it to populate a dropdown menu of auto-completed city/area names
//const searchEndpoint = 'search.json';

//ADD WEATHER ALERTS IN *ALTERTY* COLOR AT TOP

