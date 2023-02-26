const currentDate = new Date()
const currentDateIso = currentDate.toISOString();
const currentDateUser = currentDate.toString();
console.log(currentDateUser);
console.log(currentDateIso);
//const openWeatherApiUrl = 'http://api.openweathermap.org';
//const openWeatherApiKey = 'e943c609140455c43be229fc218f1f3a';

const dateEl = document.getElementById('date');
const currentTempEl = document.getElementById('currentTemp');
const currentHighLowTempEl = document.getElementById('currentHighLowTemp');
const currentTempFeelEl = document.getElementById('currentTempFeel');
const currentWindEl = document.getElementById('currentWind');
const currentHumidity = document.getElementById('currentHumidity');
const currentWeatherIcon = document.getElementById('currentWeatherImage');


/*function timeUpdate() {
  const currentDate = dayjs().format('MMM D, YYYY');
  const currentTime = dayjs().format('h:mm:ss a');
  $('#currentDateTime').text(currentTime + ' on ' + currentDate);
  
}*/

//setInterval(timeUpdate, 1000);

function submitSearch(event) {
  event.preventDefault();
  //moveSearchSection();
  // clearResultsField;

  var cityName = cityInputEl.val().trim();
  getLatLon(cityName);
  console.log('clicked');

}

function getBrowserLocation() {
  console.log("Working on it...")

  
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    // Show a map centered at latitude / longitude.
    getZones(latitude, longitude);

    console.log(`${latitude}${longitude}`);

    return;
  })
  
};



function getLatLon(search) {

    var url = openWeatherApiUrl + '/geo/1.0/direct?q='+ search + '&limit=5&appid=' + openWeatherApiKey;
    fetch(url,  {mode: 'no-cors'})
    .then(function(response) {
      return response.json();
      
    })
    .then(function(data){
      if (!data[0]) {
        alert('Location was not found!');
      } else {
        console.log(data[0].lat, data[0].lon)
        getZones(data[0].lat, data[0].lon);
        return;
      }
    });
};

function getZones(latitude, longitude) {

    url = "https://api.weather.gov/points/" + latitude + "," + longitude

	// This function passes longitude along to getForecastZones, to ultimately send it to getExtendedForecast to determine plus/minus for TZ
	
	fetch(url)
	.then(function(response) {
		return response.json();
		console.log(response);
      
		
    })
	.then(function(data) {
		console.log(data);
    getForecastHourly(data);
    getForecastOffice(data);
    console.log(longitude);
    getForecastZones(data.properties.forecastOffice);

		
    }) 
	.catch(function(err) {
		console.error(err);
    })

}




function getForecastHourly(zoneData) {

  hourlyForecastUrl = zoneData.properties.forecastHourly;
	
	fetch(hourlyForecastUrl)
	.then(function(response) {
		return response.json();
		console.log(response);
      
		
    })
	.then(function(data) {
		console.log("getForecastHourly")
    console.log(data)
    constructCurrentWeatherHtml(data);
		

		
    }) 
	.catch(function(err) {
		console.error(err);
    })

}

function getForecastOffice(zoneData) {

  forecastOfficeUrl = zoneData.properties.forecastOffice;

  fetch(forecastOfficeUrl)
	.then(function(response) {
		return response.json();
		console.log(response);
      
		
    })
	.then(function(data) {
		console.log("Forecast Office Data...")
    console.log(data);
    getWorkingZoneId(data);
		

		
    }) 
	.catch(function(err) {
		console.error(err);
    })

}

function getForecastZones(forecastZonesUrl) {

  fetch(forecastZonesUrl)
	.then(function(response) {
		return response.json();
		console.log(response);
      
		
    })
	.then(function(data) {
    
    console.log('getForecastZones');
    getZoneData(data.responsibleForecastZones[0]);
		
    

		
    }) 
	.catch(function(err) {
		console.error(err);
    })
}

function getZoneData(responsibleZonesUrl) {
  
  fetch(responsibleZonesUrl)
	.then(function(response) {
		return response.json();
		console.log(response);
      
		
    })
	.then(function(data) {
    console.log("getZoneData...")
    console.log(data);
    //getExtendedForecast(data.properties.id);

     
		
		

		
    }) 
	.catch(function(err) {
		console.error(err);
    })
}

function getExtendedForecast(observationZoneId) {

  console.log(observationZoneId);

  const currentDatePlusFourDays = new Date(currentDateIso);
  currentDatePlusFourDays.setDate(currentDatePlusFourDays.getDate() + parseInt(4));
  const currentDatePlusFourDaysIso = currentDatePlusFourDays.toISOString();
  

  
  console.log(currentDatePlusFourDaysIso);
  extendedForecastUrl = `https://api.weather.gov/zones/forecast/${observationZoneId}/observations?start=${encodeURIComponent(currentDateIso)}&end=${encodeURIComponent(currentDatePlusFourDaysIso)}`
  //extendedForecastUrlEncoded = extendedForecastUrl.encodeURI();
  // Url to get forecast for multiple days/nights and their wordy explanations
  //extendedForecastInWordsUrl = `https://api.weather.gov/zones/${zoneType}/${zoneId}/forecast`

  fetch(extendedForecastUrl)
    
      .then(function(response) {
      return response.json();
      console.log(response);
        
      
      })
    .then(function(data) {
      console.log(`getExtendedForecast for ${observationZoneId}`)
      console.log(data);
      
      
      }) 
    .catch(function(err) {
      console.error(err);
      })

    }

function getWorkingZoneId(forecastOfficeData) {
  const responsibleForecastZones = forecastOfficeData.responsibleForecastZones;
  for(zone of responsibleForecastZones){
    zoneId = zone.slice(39, 45);
    console.log(zoneId);
    console.log(zone);

    runThroughZoneIds(zoneId)
    console.log(runThroughZoneIds(zoneId));
  }
}

const runThroughZoneIds = (zoneIdSamples) => {
  
  testZonesUrl = `https://api.weather.gov/zones/forecast/${zoneIdSamples}/stations?limit=500`;
  fetch(testZonesUrl)
    .then(function(response) {
      return response.json();
      console.log(response);
    })
    .then(function(data) {

      if(data.status) {
        console.log(data.status)
        return;
      } else {
        const forecastZoneUrlOfficial = data.features[0].properties.forecast;
        const forecastZoneIdOfficial = forecastZoneUrlOfficial.slice(39, 45);
        getExtendedForecast(forecastZoneIdOfficial);
      }

      console.log(`Testing Zone ${zoneIdSamples}`);
      console.log(data);
      return data;
    })
    .catch(function(err) {
      console.log(err);
    })




}

function constructCurrentWeatherHtml(hourlyWeatherData) {
  
  const hourlyWeatherPath = hourlyWeatherData.properties.periods[0];
  
  dateEl.innerHTML = currentDateUser;
  currentTempEl.innerHTML = `${hourlyWeatherPath.temperature}°F`;
  currentWindEl.innerHTML = `Wind: ${hourlyWeatherPath.windDirection} @ ${hourlyWeatherPath.windSpeed}`;
  currentHumidity.innerHTML = `Humidity: ${hourlyWeatherPath.relativeHumidity.value}%`

}


// detailedForecastUrl = "/zones/{type}/{zoneId}/forecast"

getBrowserLocation(); 