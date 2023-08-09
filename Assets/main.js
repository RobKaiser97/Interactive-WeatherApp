// API Key for OpenWeatherMap
const API_KEY = "7d03544563882cc0c835356bf14a646b";

// An async function to fetch weather data of a given city
const fetchWeatherData = async (cityName) => {
  // Request URL for the API
  const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=imperial`;

  // Fetch data from the API
  const response = await fetch(requestUrl);

  // Throw error in case of unsuccessful request
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  // Parsing the response to JSON format
  const data = await response.json();
  return data;
};

// An async function to fetch 5-day weather data based on given latitude and longitude
const fetchWeatherData5Day = async (lat, lon) => {
  let requestUrl2 = `https://api.openweathermap.org/data/2.5/forecast/?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=imperial`;

  // Fetch data and update UI
  fetch(requestUrl2)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);

      // Update UI for each day in the 5-day forecast
      // Increment by 8 as the API provides 3-hourly data, and we want daily data
      for (let i = 4, j = 1; j <= 5; i += 8, j++) {
        updateDailyUI(j, data.list[i]);
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

