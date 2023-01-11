// Plugins to be used later in script
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);



const apiUrl = 'http://api.openweathermap.org';
const apiKey = 'e943c609140455c43be229fc218f1f3a';

// Variables to be used later in script

var cityInputEl = $('#searchInput');
var formEl = $('#searchForm');
var searchBtn = $('#searchBtn');
var cities = [];
var date = dayjs().format('MMM D, YYYY');


var date2 = $('#date2');
var date3 = $('#date3');
var date4 = $('#date4');
var date5 = $('#date5');
var date6 = $('#date6');

var temp2 = $('#temp2');
var temp3 = $('#temp3');
var temp4 = $('#temp4');
var temp5 = $('#temp5');
var temp6 = $('#temp6');

var windDirection2 = $('#windDirection2');
var windDirection3 = $('#windDirection3');
var windDirection4 = $('#windDirection4');
var windDirection5 = $('#windDirection5');
var windDirection6 = $('#windDirection6');

var windSpeed2 = $('#windSpeed2');
var windSpeed3 = $('#windSpeed3');
var windSpeed4 = $('#windSpeed4');
var windSpeed5 = $('#windSpeed5');
var windSpeed6 = $('#windSpeed6');

var humidity2 = $('#humidity2');
var humidity3 = $('#humidity3');
var humidity4 = $('#humidity4');
var humidity5 = $('#humidity5');
var humidity6 = $('#humidity6');

   

// Function to update time live on the page

function timeUpdate() {
  const currentDate = dayjs().format('MMM D, YYYY');
  const currentTime = dayjs().format('h:mm:ss a');
  $('#currentDateTime').text(currentTime + ' on ' + currentDate);
}

setInterval(timeUpdate, 1000);

// Used an if-statement to retrive local storage items on page 

// Function to scan local storage for search history and populate the page with recent searches

function retrieveHistory() {
  var retrieveHistory = localStorage.getItem("Search Result");

  if (retrieveHistory) {
    cities = retrieveHistory.split(",");
    renderButtons();
  }
}
// Function to handle the submission of the user entry

function submitSearch(event) {
    event.preventDefault();
    moveNavSection();
    clearResultsField;

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
          populateFiveDayForecast(data);
          populateCurrentWeather(cityName, data)

          console.log(data);
        })
        .catch(function (err) {
          console.error(err);
        });
  
}

  // Uses the data from getCityInfo as parameters to identify city name, our weather data, and timezone

function populateCurrentWeather(city, weather) {
  
  var currentDate = $('#date1');
  var temp = $('#temp1');
  var windDirection = $('#windDirection1');
  var windSpeed = $('#windSpeed1');
  var humidity = $('#humidity1');
  
  currentDate.text(date);
  temp.text(weather.list[0].main.temp)
  windDirection.text(weather.list[0].wind.deg);
  windSpeed.text(weather.list[0].wind.speed);
  humidity.text(weather.list[0].main.humidity);

}


// Function to populate the five day forecast cards

function populateFiveDayForecast(weather) {
 
  date = dayjs().format('MMM D, YYYY')
  // Dates 
    
  date2.text(dayjs(date).add(1, 'day').format('MMM D'));
  date3.text(dayjs(date).add(2, 'day').format('MMM D'));
  date4.text(dayjs(date).add(3, 'day').format('MMM D'));
  date5.text(dayjs(date).add(4, 'day').format('MMM D'));
  date6.text(dayjs(date).add(5, 'day').format('MMM D'));
  
  
  // Temps  
  
  temp2.text(weather.list[1].main.temp);
  temp3.text(weather.list[2].main.temp);
  temp4.text(weather.list[3].main.temp);
  temp5.text(weather.list[4].main.temp);
  temp6.text(weather.list[5].main.temp);

   // Wind direction
   
   
  windDirection2.text(weather.list[1].wind.deg);
  windDirection3.text(weather.list[2].wind.deg);
  windDirection4.text(weather.list[3].wind.deg);
  windDirection5.text(weather.list[4].wind.deg);
  windDirection6.text(weather.list[5].wind.deg);

   // Wind speed

   
  windSpeed2.text(weather.list[1].wind.speed);
  windSpeed3.text(weather.list[2].wind.speed);
  windSpeed4.text(weather.list[3].wind.speed);
  windSpeed5.text(weather.list[4].wind.speed);
  windSpeed6.text(weather.list[5].wind.speed);

  // Humidity

  
  humidity2.text(weather.list[1].main.humidity);
  humidity3.text(weather.list[2].main.humidity);
  humidity4.text(weather.list[3].main.humidity);
  humidity5.text(weather.list[4].main.humidity);
  humidity6.text(weather.list[5].main.humidity);

  } 

  // Function to move the search bar to the left side of the page to make room for the forecast cards  
  // This removes the existing classes and adds new classes to change the style
  // Removes the display: none class from the main content div

function moveNavSection() {
  
  $('.jumbotron').removeClass('main');
  $('.jumbotron').addClass('d-flex');
  $('#navSection').removeClass();
  $('#navSection').css('height', '100vh');
  $('#navSection').addClass('container');
  $('#navSection').addClass('col-2');
  $('#navSection').addClass('navSection');
  $('#sixDayForecast').removeClass('d-none');
}

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

  
  
  $("#recent-search").empty();


  for (var i = 0; i < cities.length; i++) {

    var a = $("<button>");
    
    a.addClass("city-name");
    
    a.attr("data-name", cities[i]);
    
    a.text(cities[i]);

    var history = localStorage.getItem("Search Result") || 0;
    localStorage.setItem("Search Result", cities);

    
    $("#recent-search").append(a);
  }
}

// Creating a clickable button on the search button 
// Calls retrieveHistory on page load to create history buttons

searchBtn.on('click', submitSearch);
retrieveHistory();




    