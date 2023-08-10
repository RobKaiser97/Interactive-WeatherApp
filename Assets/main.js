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
          element.textContent = `Temp: ${data.main.temp} °F`;
          break;
        case "humidity-main":
          element.textContent = `Humidity: ${data.main.humidity}%`;
          break;
        case "wind-main":
          element.textContent = `Wind: ${data.wind.speed} MPH`;
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

// Function to save search history in local storage
const saveSearchHistory = (cityName) => {
  // Get existing history or initialize with empty array if not available
  let history = JSON.parse(localStorage.getItem("searchHistory")) || [];

  // Avoid saving duplicate city names
  if (!history.includes(cityName)) {
    history.push(cityName);

    // Save updated history
    localStorage.setItem("searchHistory", JSON.stringify(history));

    // Create a new anchor tag
    let a = document.createElement("a");
    a.href = "#";
    a.className = "list-group-item list-group-item-action";
    a.textContent = cityName;

    // Add an event listener to the anchor tag
    a.addEventListener("click", async (event) => {
      event.preventDefault();
      try {
        const weatherData = await fetchWeatherData(cityName);
        updateUI(weatherData);
        const lat = weatherData.coord.lat;
        const lon = weatherData.coord.lon;
        fetchWeatherData5Day(lat, lon);
      } catch (err) {
        console.error(err);
        alert("Error occurred. Please try again.");
      }
    });

    // Add the anchor tag to the #past-searches div
    document.getElementById("past-searches").appendChild(a);
  }
};

// Function to load search history from local storage
const loadSearchHistory = () => {
  return JSON.parse(localStorage.getItem("searchHistory")) || [];
};

// Add event listener for search button
document
  .getElementById("button-addon2")
  .addEventListener("click", async (event) => {
    event.preventDefault();
    const cityName = document.getElementById("search-input").value.trim();
    if (!cityName) return;

    try {
      const weatherData = await fetchWeatherData(cityName);
      updateUI(weatherData);
      saveSearchHistory(cityName);
      const lat = weatherData.coord.lat;
      const lon = weatherData.coord.lon;
      fetchWeatherData5Day(lat, lon); // This can be used to update the 5-day forecast UI later on
    } catch (err) {
      console.error(err);
      alert("Error occurred. Please try again.");
    }
    document.getElementById("search-input").value = "";
  });

// Load search history when page is loaded
window.onload = () => {
  const history = loadSearchHistory();
  history.forEach((cityName) => {
    // Create a new anchor tag
    let a = document.createElement("a");
    a.href = "#";
    a.className = "list-group-item list-group-item-action";
    a.textContent = cityName;

    // Add an event listener to the anchor tag
    a.addEventListener("click", async (event) => {
      event.preventDefault();
      try {
        const weatherData = await fetchWeatherData(cityName);
        updateUI(weatherData);
        const lat = weatherData.coord.lat;
        const lon = weatherData.coord.lon;
        fetchWeatherData5Day(lat, lon);
      } catch (err) {
        console.error(err);
        alert("Error occurred. Please try again.");
      }
    });

    // Add event listener for 'Enter' key on search input field
    document
      .getElementById("search-input")
      .addEventListener("keydown", function (event) {
        // Check if the key pressed was the 'Enter' key
        if (event.key === "Enter") {
          // Prevent the default action
          event.preventDefault();
          // Trigger the click event on the search button
          document.getElementById("button-addon2").click();
        }
      });

    // Add the anchor tag to the #past-searches div
    document.getElementById("past-searches").appendChild(a);
  });

  if (history.length > 0) {
    document.getElementById("search-input").value = history[history.length - 1];
    document.getElementById("button-addon2").click();
  }
};

window.onbeforeunload = () => {
  localStorage.removeItem("searchHistory"); // Clear a specific item in local storage
};
