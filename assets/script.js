
/* function getApi() {
    // fetch request gets a list of all the repos for the node.js organization
    var requestUrl = 'https://api.github.com/orgs/nodejs/repos';
  
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data)
        //Loop over the data to generate a table, each table row will have a link to the repo url
        for (var i = 0; i < data.length; i++) {
          // Creating elements, tablerow, tabledata, and anchor
          var createTableRow = document.createElement('tr');
          var tableData = document.createElement('td');
          var link = document.createElement('a');
  
          // Setting the text of link and the href of the link
          link.textContent = data[i].html_url;
          link.href = data[i].html_url;
  
          // Appending the link to the tabledata and then appending the tabledata to the tablerow
          // The tablerow then gets appended to the tablebody
          tableData.appendChild(link);
          createTableRow.appendChild(tableData);
          tableBody.appendChild(createTableRow);
        }
      });
  }  */

var cityInputEl = document.querySelector('#searchInput')
var formEl = document.querySelector('#searchForm')

function getApi(cityName) {

    var requestUrl = 'api.openweathermap.org/data/2.5/forecast?q=' + cityName + '&appid=e943c609140455c43be229fc218f1f3a'

    fetch(requestUrl)
        .then(function (response) {
            return response;
        })
        .then(function(data) {
            console.log(cityName, data)
        })
}


function submitHandler(event) {

    event.preventDefault();

    var cityName = cityInputEl.value.trim();


}

// create a few reusable variables containing main apiurl and apikey
// Need a function to populate the current day weather card
// Need a function to fill the five day fprecast cards, for loop 
// Function to get lat, lon from api
// Function using the lat and lon for city to make call for weather
// Function to add recent search to search history and redraw buttons to page
// Function to add search history buttons to page
// Function to pull recent searches from local storage and have buttons for them create on page