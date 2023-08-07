// GIVEN a weather dashboard with form inputs
// WHEN I search for a city
// THEN I am presented with current and future conditions for that city and that city is added to the search history
// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

// 1 create a function to store search history
// 2 create a function to display search history
// 4. Create a current weather section
// 5. Create a 5 day forecast section
// 6. Create a function to get the weather data
// 7. Create a function to display the weather data
// 8. Create a function to save the search history
// 9. Create a function to display the search history
// 10. Create a function to display the current weather
// 11. Create a function to display the 5 day forecast
// 12. Create a function to display the humidity
// 13. Create a function to display the wind speed

// var requestURL = 'https://api.openweathermap.org/data/2.5/forecast?q=' + searchResult + '&appid=7d03544563882cc0c835356bf14a646b';





// var searchResult = document.getElementById('button-addon2').addEventListener('click', (event) => {
//     // Prevent the default form submission behavior
//     event.preventDefault();

//     // Get the value from the input field
//     const query = document.getElementById('search-input').value;

//     // add query to the local storage
//     localStorage.setItem('city name', query);


//     // Do something with the search query
//     processQuery(query);

// });

// processQuery = (query) => {
//     console.log("Search query:", query);
//     createNewSearchLink(query);

//     // Here you can process the query, e.g., call an API, filter results, etc.
// }


// createNewSearchLink = (query) => {
//     // Create a new <a> element
//     const newLink = $('<a>');

//     // Set the href attribute
//     newLink.attr('href', 
//     'https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=7d03544563882cc0c835356bf14a646b');
//     newLink.addClass('list-group-item list-group-item-action');

//     // Set the text() content
//     newLink.textContent = query;

//     // Add the new element to the DOM
//     $('past-searches').append(newLink);
// }

// capturePastSearches = () => {
//     localStorage.setItem('Past Search Results', $('past-searches').text());
// }

// loadPastSearches = () => {
//     $(document).ready(() => {
//         let pastSearches = localStorage.getItem('Past Search Results');
//         if (pastSearches) {
//             $('past-searches').text(pastSearches);
//         }
//     })};


fetchWeatherAPI = (searchResult) => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchResult + '&appid=7d03544563882cc0c835356bf14a646b' +
    '&units=imperial')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    let humidity = data.main.humidity;
    let windSpeed = data.wind.speed;
    let temp = data.main.temp;
    let date = new Date(data.dt * 1000).toDateString() + $('<br>') + data.weather[0].icon;

    // document.getElementById('date-icon-main').textContent(date);
    document.getElementById('temp-main').innerHTML = temp;
    $('#humidity-main').text(humidity);
    $('#wind-speed-main').text(windSpeed);

    })
    .catch(err => alert("Enter a valid city name!"));
}

const searchResult = document.getElementById('button-addon2').addEventListener('click', (event) => {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the value from the input field
    let query = document.getElementById('search-input').value;

    // // add query to the local storage
    // let city = JSON.stringify(query);
    // localStorage.setItem('city name', query);
    // localStorage.getItem('city name').append(query);


    fetchWeatherAPI(query);
    console.log(query);
    console.log(fetchWeatherAPI)
    
});

// let cities = [];

// let searchHistory = JSON.parse(localStorage.getItem("city")) || [];
// for (let i = 0; i < searchHistory.length; i++) {
//   getHistory(searchHistory[i]);
// }

// // Save the city searched in the local storage
// const saveToLocalStorage = (city) => {
//   cities = JSON.parse(localStorage.getItem("city")) || [];
//   if (!cities.includes(city)) {
//     cities.push(city);
//     localStorage.setItem("city", JSON.stringify(cities));
//     getHistory(city);
//   }
// };
