//const currentDate = new Date();
//const currentTime = new Date();
const DateTime = luxon.DateTime;
const currentDate = DateTime.local().toISO
console.log(currentDate);

const currentTime = DateTime.now().toISO({ format: 'basic' })
console.log(currentTime);

const openWeatherApiUrl = 'http://api.openweathermap.org';
const openWeatherApiKey = 'e943c609140455c43be229fc218f1f3a';

const cityInputEl = $('#searchInput');
const formEl = $('#searchForm');
const searchBtn = $('#searchBtn');
const recentSearchEl = $('#recentSearch')
const cities = [];
//const date = dayjs().format('MMM D, YYYY');
const currentWeather = $('#currentWeather');

function timeUpdate() {
  const currentDate = dayjs().format('MMM D, YYYY');
  const currentTime = dayjs().format('h:mm:ss a');
  $('#currentDateTime').text(currentTime + ' on ' + currentDate);
  
}

setInterval(timeUpdate, 1000);

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
  })
  
};

function getTimezonePlusMinus(longitude) {
  prefix = longitude.slice(0,1);
  if(prefix == '-') {
    return '-'
  } else {
  return;
  }
  
}

function getLatLon(search) {

    var url = openWeatherApiUrl + '/geo/1.0/direct?q='+ search + '&limit=5&appid=' + openWeatherApiKey;
    fetch(url)
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
    getForecastZones(data.properties.forecastOffice, longitude);
		

		
    }) 
	.catch(function(err) {
		console.error(err);
    })

}




function getForecastHourly(zoneData) {

  hourlyForecastUrl = zoneData.properties.forecastHourly
	
	fetch(hourlyForecastUrl)
	.then(function(response) {
		return response.json();
		console.log(response);
      
		
    })
	.then(function(data) {
		console.log("getForecastHourly")
    console.log(data)
		

		
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
		

		
    }) 
	.catch(function(err) {
		console.error(err);
    })

}

function getForecastZones(forecastZonesUrl, longitude) {

  fetch(forecastZonesUrl)
	.then(function(response) {
		return response.json();
		console.log(response);
      
		
    })
	.then(function(data) {
    
    console.log('getForecastZones');
    getZoneData(data.responsibleForecastZones[0], longitude);
		
    

		
    }) 
	.catch(function(err) {
		console.error(err);
    })
}

function getZoneData(responsibleZonesUrl, longitude) {
  
  fetch(responsibleZonesUrl)
	.then(function(response) {
		return response.json();
		console.log(response);
      
		
    })
	.then(function(data) {
    console.log("getZoneData...")
    console.log(data);
    getExtendedForecast(data.properties.id, longitude);

     
		
		

		
    }) 
	.catch(function(err) {
		console.error(err);
    })
}

function getExtendedForecast(observationZoneId, longitude) {

  const timeZoneOffset = new Date().getTimezoneOffset();
  const timeZoneOffsetHours = `${getTimezonePlusMinus}0${(timeZoneOffset/60)}00`;
  const dateFormatted = currentDate.toLocaleString().slice(0, -1);
  const dateTimePlusFive = new Date().setDate(currentDate.getDate() + 5).toIsoString();
  const prefix = Math.sign(longitude);
  let prefixIdentifier = ''
  
  
  if(prefix === -1) {
    
    prefixIdentifier = '-';
  } else {
    prefixIdentifier = '+';
  }
  
  const dateIso8601 = `${dateFormatted}${prefixIdentifier}${timeZoneOffsetHours}`;
  
  extendedForecastUrl = `https://api.weather.gov/zones/forecast/${observationZoneId}/observations?start=${dateIso8601}&${dateTimePlusFive}&limit=10`

  fetch(extendedForecastUrl, {
      
    method: 'GET',
    mode: 'no-cors',
    cache: 'no-cache', 
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    
      .then(function(response) {
      return response.json();
      console.log(response);
        
      
      })
    .then(function(data) {
      console.log("getExtendedForecast...")
      console.log(data);
      
      
      }) 
    .catch(function(err) {
      console.error(err);
      })

}

// detailedForecastUrl = "/zones/{type}/{zoneId}/forecast"
searchBtn.on('click', submitSearch);
getBrowserLocation(); 