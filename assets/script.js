
// Plugins to be used later in script
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);



const apiUrl = 'http://api.openweathermap.org';
const apiKey = 'e943c609140455c43be229fc218f1f3a';

// Variables to be used later in script

const cityInputEl = $('#searchInput');
const formEl = $('#searchForm');
const searchBtn = $('#searchBtn');
const recentSearchEl = $('#recentSearch')
const cities = [];
const date = dayjs().format('MMM D, YYYY');
const currentWeather = $('#currentWeather');
const currentWeatherGeo = $('#currentWeatherGeo');



   

// Function to update time live on the page

function timeUpdate() {
  const currentDate = dayjs().format('MMM D, YYYY');
  const currentTime = dayjs().format('h:mm:ss a');
  $('#currentDateTime').text(currentTime + ' on ' + currentDate);
}

setInterval(timeUpdate, 1000);

// Used an if-statement to retrive local storage items on page 

// Function to scan local storage for search history and populate the page with recent searches

// Function to handle the submission of the user entry

function submitSearch(event) {
  event.preventDefault();
  // moveSearchSection();
  clearResultsField();
  
  var cityName = cityInputEl.val().trim();
  getLatLon(cityName);
  console.log('clicked');
  
}

// Function to retrieve latitude and longitude data about city in search and passes on to getGetCity info to retrieve the weather data

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

// Function to use the returned latitude and longitude data to search for and retrieve weather data from API

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
    console.log(data)
    populateFiveDayForecast(data);
    // populateCurrentWeather(cityName, data)
    createCurrentWeatherSection(cityName, data)
    
    console.log(data);
  })
  .catch(function (err) {
    console.error(err);
  });
  
}

// Uses the data from getCityInfo as parameters to identify city name, our weather data, and timezone

/*function populateCurrentWeather(city, weather) {
  
  var currentDate = $('#date');
  var temp = $('#temp');
  var windDirection = $('#windDirection');
  var windSpeed = $('#windSpeed');
  var humidity = $('#humidity');
  var weatherImg = $('#weatherImg');
  var iconId = weather.list[0].weather[0].icon;
  var feelsLike = $('#feelsLike');
  var highLowTemp = $('#highLowTemp');
  
  
  currentDate.text(city + ' ' + date);
  temp.text(weather.list[0].main.temp)
  windDirection.text(weather.list[0].wind.deg);
  windSpeed.text(weather.list[0].wind.speed);
  humidity.text(weather.list[0].main.humidity);
  weatherImg.attr('src', `https://openweathermap.org/img/wn/${iconId}@2x.png`);
  feelsLike.text(weather.list[0].main.feels_like);
  highLowTemp.text(weather.list[0].main.temp_max + '°F/' + weather.list[0].main.temp_min + '°F');
} */


function createCurrentWeatherSection(city, weather) {
  
  var currentDate = $('<h2>');
  var temp = $('<p>');
  var wind = $('<p>');
  var windSpeed = $('<span>');
  var windDirection = $('<span>');
  var humidity = $('<p>');
  var weatherImg = $('<img>');
  var feelsLike = $('<p>');
  
  var iconId = weather.list[0].weather[0].icon;
  
  
  
  currentDate.text(city + ' ' + date);
  temp.text('Todays temperatures: ' + weather.list[0].main.temp + ' (' + weather.list[0].main.temp_max + '°F/' + weather.list[0].main.temp_min + '°F)');
  windDirection.text(weather.list[0].wind.deg);
  windSpeed.text(weather.list[0].wind.speed);
  wind.append('Wind: ', windDirection, '° @ ', windSpeed, ' MPH');
  humidity.text('Humidity: ' + weather.list[0].main.humidity);
  weatherImg.attr('src', `https://openweathermap.org/img/wn/${iconId}@2x.png`);
  feelsLike.text('Feels like: ' + weather.list[0].main.feels_like);
  
  
  currentWeather.append(currentDate, temp, feelsLike, wind, humidity, weatherImg)
  
  
  
  
}

//Function to get current weather for location of user based on browser location

function getCurrentWeatherGeo() {

  getLocalWeather();

}

function getLocalWeather() {

  url = 
  fetch(url)
}




// Function to populate the five day forecast cards
// Uses a for-loop to iterate through a slice of the weather data array and update the five-day forecast

function populateFiveDayForecast(weather) {
  
  var currentDate = dayjs().format('MMM D, YYYY');
  var nextFive = weather.list.slice(1, 7);
  
  for (let i = 1; i <= nextFive.length; i++) {
    
    let date = $(`#date${i}`);
    let temp = $(`#temp${i}`);
    let windDirection = $(`#windDirection${i}`);
    let windSpeed = $(`#windSpeed${i}`);
    let humidity = $(`#humidity${i}`); 
    let imageIcon = $(`#weatherImg${i}`);
    let iconId = weather.list[i].weather[0].icon;
    
    date.text(dayjs(currentDate).add(i, 'day').format('MMM D'));
    temp.text(weather.list[i].main.temp);
    windDirection.text(weather.list[i].wind.deg);
    windSpeed.text(weather.list[i].wind.speed);
    humidity.text(weather.list[i].main.humidity); 
    imageIcon.attr('src', `https://openweathermap.org/img/wn/${iconId}@2x.png`)
    
    
  }
}

// Function to move the search bar to the left side of the page to make room for the forecast cards  
// This removes the existing classes and adds new classes to change the style
// Removes the display: none class from the main content div

/*function moveSearchSection() {
  
  $('.jumbotron').removeClass('main');
  $('.jumbotron').addClass('d-flex');
  $('#searchSection').removeClass();
  $('#searchSection').css('height', '100vh');
  $('#searchSection').addClass('container');
  $('#searchSection').addClass('col-2');
  $('#searchSection').addClass('searchSection');
  $('#sixDayForecast').removeClass('d-none');
} */

// Function to clear the results field when searching for a new city from the same page

function clearResultsField() {
  
  date1.siblings().text('');
  date2.siblings().text('');
  date3.siblings().text('');
  date4.siblings().text('');
  date5.siblings().text('');
  date6.siblings().text('');
  
}


// Function to create buttons on page representing recent search history
function renderButtons() {
  
  
  
  recentSearchEl.empty();
  
  
  for (var i = 0; i < cities.length; i++) {
    
    var a = $("<button>");
    
    a.addClass("city-name");
    
    a.attr("data-name", cities[i]);
    a.css('border-radius', '5px');
    
    a.text(cities[i]);
    
    var history = localStorage.getItem("Search Result") || 0;
    localStorage.setItem("Search Result", cities);
    
    
    recentSearchEl.append(a);
  }
}

function retrieveHistory() {
  var retrieveHistory = localStorage.getItem("Search Result");

  if (retrieveHistory) {
    cities = retrieveHistory.split(",");
    renderButtons();
  }
}
function useSearchHistory(e) {
  moveSearchSection();
  
  
  if (!e.target.matches("button.city-name")) {
    return;
  };
  var btn = e.target;
  var search = btn.getAttribute("data-name");
  getLatLon(search);
}
// Creating a clickable button on the search button 
// Calls retrieveHistory on page load to create history buttons

searchBtn.on('click', submitSearch);
recentSearchEl.on('click', useSearchHistory);
retrieveHistory();
