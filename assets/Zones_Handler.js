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

function getZones(latitude, longitude) {

    url = "https://api.weather.gov/points/" + latitude + "," + longitude

	
	
	fetch(url)
	.then(function(response) {
		return response.json();
		console.log(response);
      
		
    })
	.then(function(data) {
		console.log(data);
    getForecastHourly(data.properties.forecastHourly);
    getForecastOffice(data.properties.forecastOffice);
    getForecastZone(data.properties.forecastZone);
		

		
    }) 
	.catch(function(err) {
		console.error(err);
    })

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
    })
}

function getForecastHourly(url) {

	
	fetch(url)
	.then(function(response) {
		return response.json();
		console.log(response);
      
		
    })
	.then(function(data) {
		console.log("ForecastHourly: " + data);
		

		
    }) 
	.catch(function(err) {
		console.error(err);
    })

}

function getForecastOffice(foreCastOfficeUrl) {

  fetch(url)
	.then(function(response) {
		return response.json();
		console.log(response);
      
		
    })
	.then(function(data) {
		console.log("ForecastOffice: " + data);
		

		
    }) 
	.catch(function(err) {
		console.error(err);
    })

}

function getForecastZone(forecastZoneUrl) {

  fetch(forecastZoneUrl)
	.then(function(response) {
		return response.json();
		console.log(response);
      
		
    })
	.then(function(data) {
    console.log(data);
		console.log("ForecastZone: " + data);
		

		
    }) 
	.catch(function(err) {
		console.error(err);
    })
}

searchBtn.on('click', submitSearch);