dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

const apiUrl = 'http://api.openweathermap.org'
const apiKey = 'e943c609140455c43be229fc218f1f3a'

var cityInputEl = $('#searchInput');
var formEl = $('#searchForm');
var searchBtn = $('#searchBtn');

function timeUpdate() {
    const currentDate = dayjs().format('MMM D, YYYY');
    const currentTime = dayjs().format('h:mm:ss a');
    $('#currentDateTime').text(currentDate + ' ' + currentTime);
}

setInterval(timeUpdate, 1000);

// Function to handle the submission of the user entry

function submitSearch(event) {
    event.preventDefault();

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
            populateFiveDayForecast(data, data.timezone);
            populateCurrentWeather(cityName, data, data.timezone)
          })
          .catch(function (err) {
            console.error(err);
          });
      // console.log(url); 
  }

  // Function that uses the weather data retrieved to populate the HTML with weather data.
  // Uses the data from getCityInfo as parameters to identify city name, our weather data, and timezone

  function populateCurrentWeather(city, weather, time) {
    var date = dayjs.tz(time).format('MMM D, YYYY');
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

function populateFiveDayForecast(weather, time) {

    // Going to leave the variables declared for now, 
    //as I think I'll use the existing code lines to makethe HTML more dynamic
    
   // Temps  
  
   var temp2 = $('#temp2');
   var temp3 = $('#temp3');
   var temp4 = $('#temp4');
   var temp5 = $('#temp5');
   var temp6 = $('#temp6');
   temp2.text(weather.list[1].main.temp);
   temp3.text(weather.list[2].main.temp);
   temp4.text(weather.list[3].main.temp);
   temp5.text(weather.list[4].main.temp);
   temp6.text(weather.list[5].main.temp);

   // Wind direction
   
   var windDirection2 = $('#windDirection2');
   var windDirection3 = $('#windDirection3');
   var windDirection4 = $('#windDirection4');
   var windDirection5 = $('#windDirection5');
   var windDirection6 = $('#windDirection6');
   windDirection2.text(weather.list[1].wind.deg);
   windDirection3.text(weather.list[2].wind.deg);
   windDirection4.text(weather.list[3].wind.deg);
   windDirection5.text(weather.list[4].wind.deg);
   windDirection6.text(weather.list[5].wind.deg);

   // Wind speed

   var windSpeed2 = $('#windSpeed2');
   var windSpeed3 = $('#windSpeed3');
   var windSpeed4 = $('#windSpeed4');
   var windSpeed5 = $('#windSpeed5');
   var windSpeed6 = $('#windSpeed6');
   windSpeed2.text(weather.list[1].wind.speed);
   windSpeed3.text(weather.list[2].wind.speed);
   windSpeed4.text(weather.list[3].wind.speed);
   windSpeed5.text(weather.list[4].wind.speed);
   windSpeed6.text(weather.list[5].wind.speed);

   // Humidity

   var humidity2 = $('#humidity2');
   var humidity3 = $('#humidity3');
   var humidity4 = $('#humidity4');
   var humidity5 = $('#humidity5');
   var humidity6 = $('#humidity6');
   humidity2.text(weather.list[1].main.humidity);
   humidity3.text(weather.list[2].main.humidity);
   humidity4.text(weather.list[3].main.humidity);
   humidity5.text(weather.list[4].main.humidity);
   humidity6.text(weather.list[5].main.humidity);

    } 


    /*function populateFiveDayForecast(weather, time) {

        var temp = $('.temperature');
        var windDirection = $('.windDirection');
        var windSpeed = $('.windSpeed');
        var humidity = $('.humidity');

        $('.forecast').each(function() {
            
            
            for (let i = 1; i < 6; i++) {
                var dayId = parseInt($(this).attr('id').split('date')[i]);

                if (dayId == i) {

                    temp.text(weather.list[i].main.temp);
                    windDirection.text(weather.list[i].wind.deg);
                    windSpeed.text(weather.list[i].wind.speed);
                    humidity.text(weather.list[i].main.humidity);

                } else if (dayId == 3) {

                    temp.text(weather.list[i].main.temp);
                    windDirection.text(weather.list[i].wind.deg);
                    windSpeed.text(weather.list[i].wind.speed);
                    humidity.text(weather.list[i].main.humidity);
                } else if (dayId == 4) {

                    temp.text(weather.list[i].main.temp);
                    windDirection.text(weather.list[i].wind.deg);
                    windSpeed.text(weather.list[i].wind.speed);
                    humidity.text(weather.list[i].main.humidity);
                } else if (dayId == 5) {

                    temp.text(weather.list[i].main.temp);
                    windDirection.text(weather.list[i].wind.deg);
                    windSpeed.text(weather.list[i].wind.speed);
                    humidity.text(weather.list[i].main.humidity);
                } else {
                    temp.text(weather.list[i].main.temp);
                    windDirection.text(weather.list[i].wind.deg);
                    windSpeed.text(weather.list[i].wind.speed);
                    humidity.text(weather.list[i].main.humidity);
                }
            }
        })
    } */

searchBtn.on('click', submitSearch);
