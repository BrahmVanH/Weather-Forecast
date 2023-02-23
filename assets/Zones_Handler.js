const dayjs = require("dayjs");

const openWeatherApiUrl = 'http://api.openweathermap.org';
const openWeatherApiKey = 'e943c609140455c43be229fc218f1f3a';

const cityInputEl = $('#searchInput');
const formEl = $('#searchForm');
const searchBtn = $('#searchBtn');
const recentSearchEl = $('#recentSearch')
const cities = [];
const date = dayjs().format('MMM D, YYYY');
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

	
	
	fetch(url)
	.then(function(response) {
		return response.json();
		console.log(response);
      
		
    })
	.then(function(data) {
		console.log(data);
    getForecastHourly(data);
    getForecastOffice(data);
    getForecastZones(data.properties.forecastOffice);
		

		
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

function getForecastZones(forecastZonesUrl) {

  fetch(forecastZonesUrl)
	.then(function(response) {
		return response.json();
		console.log(response);
      
		
    })
	.then(function(data) {
    console.log(data);
	
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
    console.log(data);
		
		

		
    }) 
	.catch(function(err) {
		console.error(err);
    })
}

function getExtendedForecast(observationZone) {
       dateAndTime = dayjs().format('YYYY-MM-DDTHH:mm:ss.SSSZZ')
       dateAndTimePlusFive = dateAndTime.add(9, 'day')
  //Dont forget to switch this value out with the zone from the function that gets the zone
  let dateAndTime = "2023-02-23T21:3A14:3A10.000-0500"
  let dateAndTimePlusFive = "end=2023-02-27T21%3A14%3A10.000-0500"
  let observationZone = "LMZ221"
  extendedForecastUrl = `https://api.weather.gov/zones/forecast/${observationZone}/observations?start=${dateAndTime}&${dateAndTimePlusFive}&limit=10`



}



searchBtn.on('click', submitSearch);
getBrowserLocation();