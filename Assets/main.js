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

// Function to update UI for a day in the 5-day forecast
const updateDailyUI = (dayIndex, data) => {
    const iconCode = data.weather[0].icon;
    const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
  
    // Update UI elements with fetched data
    document.getElementById(`date-main-${dayIndex}`).textContent = new Date(
      data.dt * 1000
    ).toLocaleString();
    document.getElementById(`weather-icon-${dayIndex}`).src = iconUrl;
    document.getElementById(`temp-main-${dayIndex}`).textContent =
      data.main.temp + " °F";
    document.getElementById(`humidity-main-${dayIndex}`).textContent =
      data.main.humidity + "%";
    document.getElementById(`wind-main-${dayIndex}`).textContent =
      data.wind.speed + " MPH";
  };
  
  // Function to update UI with current weather data
  const updateUI = (data) => {
    // Prefixes of element IDs to update. Elements to be updated have unique numeric suffixes.
    const idPrefixes = [
      "temp-main",
      "humidity-main",
      "wind-main",
      "weather-icon",
      "date-main",
    ];
  
    // Iterate over prefixes and update corresponding elements
    idPrefixes.forEach((prefix) => {
      let elements = document.querySelectorAll(`[id^="${prefix}-"]`);
      elements.forEach((element, index) => {
        switch (prefix) {
          case "temp-main":
            element.textContent = `${data.main.temp} °F`;
            break;
          case "humidity-main":
            element.textContent = `${data.main.humidity}%`;
            break;
          case "wind-main":
            element.textContent = `${data.wind.speed} MPH`;
            break;
          case "weather-icon":
            const iconCode = data.weather[0].icon;
            element.src = `http://openweathermap.org/img/w/${iconCode}.png`;
            break;
          case "date-main":
            const date = new Date(data.dt * 1000);
            element.textContent = `${data.name}, US, ${date.toLocaleString()}`;
            break;
        }
      });
    });
  };
  
