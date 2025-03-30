document.addEventListener('DOMContentLoaded', () => {
    // DOM elements
    const locationInput = document.getElementById('location-input');
    const searchBtn = document.getElementById('search-btn');
    const currentLocationBtn = document.getElementById('current-location-btn');
    const weatherContainer = document.getElementById('weather-container');
    const weatherInfo = document.getElementById('weather-info');
    const loader = document.getElementById('loader');
    const errorMessage = document.getElementById('error-message');

    // Weather data elements
    const locationElement = document.getElementById('location');
    const dateTimeElement = document.getElementById('date-time');
    const temperatureElement = document.getElementById('temperature');
    const weatherIcon = document.getElementById('weather-icon');
    const weatherDescription = document.getElementById('weather-description');
    const feelsLikeElement = document.getElementById('feels-like');
    const humidityElement = document.getElementById('humidity');
    const windSpeedElement = document.getElementById('wind-speed');
    const pressureElement = document.getElementById('pressure');

    // API details
    // Use OpenWeatherMap API (Free tier requires signup)
    const apiKey = 'YOUR_API_KEY'; // Replace with your API key
    const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

    // Event listeners
    searchBtn.addEventListener('click', () => {
        const location = locationInput.value.trim();
        if (location) {
            getWeatherByCity(location);
        }
    });

    locationInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const location = locationInput.value.trim();
            if (location) {
                getWeatherByCity(location);
            }
        }
    });

    currentLocationBtn.addEventListener('click', () => {
        if (navigator.geolocation) {
            showLoader();
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    getWeatherByCoordinates(latitude, longitude);
                },
                (error) => {
                    hideLoader();
                    showError("Unable to retrieve your location. Please allow location access or search by city name.");
                }
            );
        } else {
            showError("Geolocation is not supported by your browser.");
        }
    });

    // Function to get weather by city name
    function getWeatherByCity(city) {
        showLoader();
        fetch(`${apiUrl}?q=${city}&units=metric&appid=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("City not found. Please try again.");
                }
                return response.json();
            })
            .then(data => {
                displayWeatherData(data);
            })
            .catch(error => {
                showError(error.message);
            });
    }

    // Function to get weather by coordinates
    function getWeatherByCoordinates(lat, lon) {
        fetch(`${apiUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Weather data not available. Please try again later.");
                }
                return response.json();
            })
            .then(data => {
                displayWeatherData(data);
            })
            .catch(error => {
                showError(error.message);
            });
    }

    // Function to display weather data
    function displayWeatherData(data) {
        // Set location name
        locationElement.textContent = `${data.name}, ${data.sys.country}`;

        // Set date and time
        const currentDate = new Date();
        dateTimeElement.textContent = currentDate.toLocaleString();

        // Set temperature and weather info
        temperatureElement.textContent = Math.round(data.main.temp);
        feelsLikeElement.textContent = Math.round(data.main.feels_like);
        humidityElement.textContent = data.main.humidity;
        windSpeedElement.textContent = data.wind.speed;
        pressureElement.textContent = data.main.pressure;

        // Set weather description
        weatherDescription.textContent = data.weather[0].description;

        // Set weather icon
        const iconCode = data.weather[0].icon;
        weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        weatherIcon.alt = data.weather[0].description;

        // Show weather info
        hideLoader();
        errorMessage.style.display = 'none';
        weatherInfo.style.display = 'block';
    }

    // Helper functions for UI state
    function showLoader() {
        weatherInfo.style.display = 'none';
        errorMessage.style.display = 'none';
        loader.style.display = 'block';
    }

    function hideLoader() {
        loader.style.display = 'none';
    }

    function showError(message) {
        weatherInfo.style.display = 'none';
        errorMessage.textContent = message;
        errorMessage.style.display = 'block';
    }

    // Initial state - try to get user's location on page load
    if (navigator.geolocation) {
        showLoader();
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                getWeatherByCoordinates(latitude, longitude);
            },
            () => {
                // If user denies location access, don't show an error, just wait for them to search
                hideLoader();
            }
        );
    }
});