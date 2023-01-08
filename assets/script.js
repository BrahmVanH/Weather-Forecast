dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);


const apiUrl = 'http://api.openweathermap.org'
const apiKey = 'e943c609140455c43be229fc218f1f3a'

var cityInputEl = document.querySelector('#searchInput');
var formEl = document.querySelector('#searchForm');
var searchBtnEl = document.querySelector('#searchBtn');

  
  
function timeUpdate() {
  
  const currentDate = dayjs().format('MMM D, YYYY');
  const currentTime = dayjs().format('h:mm:ss a');
  document.querySelector('#currentDateTime').textContent = currentDate + ' ' + currentTime;
}
  
setInterval(timeUpdate, 1000);

function submitHandler(event) {

   

    event.preventDefault();
    var cityName = cityInputEl.value.trim();
    getLatLon(cityName);
    console.log('clicked');


}

function getLatLon(search) {

  var url = apiUrl + '/geo/1.0/direct?q='+ search + '&limit=5&appid=' + apiKey;
    fetch(url)
    .then(function(response) {
      return response.json();
    })
    .then(function(data){
      if (!data[0]) {
        alert('Location was not found!');
      } else {
        // addHistory(search)
        getCityInfo(data[0]);
        return;
      }
    })

}

function getCityInfo(cityData) {

  var lat = cityData.lat;
  var lon = cityData.lon;
  var cityName = cityData.name;

  var url = apiUrl +'/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=' + apiKey + '&units=imperial';
  
    fetch(url)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          populateFiveDayForecast(data, data.timezone);
          populateCurrentWeather(cityName, data, data.timezone)
        })
        .catch(function (err) {
          console.error(err);
        });
    // console.log(url); 
};

function populateCurrentWeather(city, weather, time) {
  var date = dayjs.tz(time).format('MMM D, YYYY');
  var currentDate = document.querySelector('#date1');
  var temp = document.querySelector('#temp1');
  var windDirection = document.querySelector('#windDirection1');
  var windSpeed = document.querySelector('#windSpeed1');
  var humidity = document.querySelector('#humidity1');
  currentDate.textContent = date;

  temp.textContent = weather.list[0].main.temp
  windDirection.textContent = weather.list[0].wind.deg;
  windSpeed.textContent = weather.list[0].wind.speed;
  humidity.textContent = weather.list[0].main.humidity

  

} 

function populateFiveDayForecast(weather, time) {

  for (let i = 1; i < 6; i++) {

    var temp = parseInt(document.attribute('id').split('temperature')[i]);
    var temp = document.getElementById('temperature[i]')
    var windDirection = document.getElementById('windDirection' + [i]);
    var windSpeed = document.getElementById('windSpeed' + [i]);
    var humidity = document.getElementById('humidity' + [i]);


    temp.textContent = weather.list[i].main.temp
    windDirection.textContent = weather.list[i].wind.deg;
    windSpeed.textContent = weather.list[i].wind.speed;
    humidity.textContent = weather.list[i].main.humidity
  }

}


searchBtn.addEventListener('click', submitHandler);


  





// create a few reusable variables containing main apiurl and apikey
// Need a function to populate the current day weather card
// Need a function to fill the five day fprecast cards, for loop 
// Function to get lat, lon from api
// Function using the lat and lon for city to make call for weather
// Function to add recent search to search history and redraw buttons to page
// Function to add search history buttons to page
// Function to pull recent searches from local storage and have buttons for them create on page