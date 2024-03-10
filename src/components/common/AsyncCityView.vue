<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- banner -->

    <!-- weather overview -->
    <div v-if="weatherData" class="flex flex-col items-center text-white py-12">
      <h1 class="text-xl md:text-4xl mb-2">{{ city }}, {{ state }}</h1>
      <p class="text-sm mb-12">
        {{
          new Date(weatherData.currentTime).toLocaleDateString("en-in", {
            weekday: "short",
            day: "2-digit",
            month: "long",
          })
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString("en-in", {
            timeStyle: "short",
          })
        }}
      </p>
      <div class="text-center text-6xl">
        <i :class="weatherData.weatherIconClass"></i>
        <p class="text-7xl">{{ Math.round(weatherData.temp) }}°C</p>
      </div>
      <div
        class="grid grid-cols-2 lg:grid-cols-3 md:grid-cols-2 gap-6 shadow-xl p-5 rounded-xl mt-10"
      >
        <div class="weather-info-item h-28">
          <p class="font-semibold">Min | Max</p>
          <p>
            {{ Math.round(weatherData.temp_min) }}°C ~
            {{ Math.round(weatherData.temp_max) }}°C
          </p>
        </div>
        <div class="weather-info-item h-28">
          <p class="font-semibold">Wind Speed</p>
          <p class="text-2xl">{{ Math.round(weatherData.windSpeed) }} km/h</p>
        </div>
        <div class="weather-info-item h-28">
          <p class="font-semibold">Visibility</p>
          <p class="text-2xl">{{ Math.round(weatherData.visibility) }} km</p>
        </div>
        <div class="weather-info-item h-28">
          <p class="font-semibold">Air Pressure</p>
          <p class="text-2xl">{{ weatherData.airPressurehpa }} hPa</p>
        </div>
        <div class="weather-info-item h-28">
          <p class="font-semibold">Weather Conditions</p>
          <p class="text-2xl">{{ weatherData.weatherConditions }}</p>
        </div>
        <div class="weather-info-item h-28">
          <p class="font-semibold">Humidity</p>
          <p class="text-2xl">{{ weatherData.humidity }}%</p>
        </div>
        <div class="weather-info-item h-28">
          <p class="font-semibold">Cloudiness</p>
          <p class="text-2xl">{{ weatherData.cloudsPercentage }}%</p>
        </div>
        <div class="weather-info-item h-28">
          <p class="font-semibold">Sunrise</p>
          <p>
            {{
              new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-in", {
                timeStyle: "short",
              })
            }}
          </p>
        </div>
        <div class="weather-info-item h-28">
          <p class="font-semibold">Sunset</p>
          <p>
            {{
              new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-in", {
                timeStyle: "short",
              })
            }}
          </p>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Loading weather data...</p>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const city = route.params.city;
const state = route.params.state;
const lat = route.query.lat;
const lng = route.query.lng;

const APIkey = "f7070cf0287e9970cb9badfa61ff43ec";
const getWeatherData = async (lat, lng, APIkey) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${APIkey}`
    );
    const data = response.data;

    // Convert temperature to Celsius
    const tempCelsius = data.main.temp - 273.15;
    const tempMaxCelsius = data.main.temp_max - 273.15;
    const tempMinCelsius = data.main.temp_min - 273.15;
    // Convert wind speed to km/h
    const windSpeedKmh = data.wind.speed * 3.6;
    // Convert visibility to km
    const visibilityKm = data.visibility / 1000;
    const airPressure = data.main.pressure;
    const weathers = data.weather[0];
    const weatherCondition = weathers.main;
    const humidityData = data.clouds;
    const cloud = humidityData.all;

    // Add converted values to the data object
    data.temp = tempCelsius;
    data.windSpeed = windSpeedKmh;
    data.visibility = visibilityKm;
    data.temp_max = tempMaxCelsius;
    data.temp_min = tempMinCelsius;
    data.airPressurehpa = airPressure;
    data.weatherConditions = weatherCondition;
    data.humidity = data.main.humidity;
    data.cloudsPercentage = cloud;

    // Calculate current date and time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = data.dt * 1000 + localOffset;
    data.currentTime = utc + 1000 * data.timezone;

    // Determine weather icon class based on weather conditions
    const iconCode = weathers.icon;
    data.weatherIconClass = getWeatherIconClass(iconCode);

    return data;
  } catch (error) {
    console.log(error);
  }
};

const getWeatherDataMonth = async (lat, lng, APIkey) => {
  try {
    console.log(lat);
    console.log(lng);
    const response = axios.get(
      `https://pro.openweathermap.org/data/2.5/forecast/climate?lat=${lat}&lon=${lng}&appid=${APIkey}`
    );
    const monthlyWeather = response.data;
    console.log("monthlyWeather", monthlyWeather);
  } catch (error) {
    console.log(error);
  }
};

// Function to get weather icon class based on weather conditions and time of day
const getWeatherIconClass = (iconCode, currentTime) => {
  // Implement your logic to map icon code to appropriate class
  // Example logic:
  if (iconCode.includes("01")) {
    // Clear sky
    return isDaytime(currentTime) ? "fas fa-sun" : "fas fa-moon";
  } else if (iconCode.includes("02")) {
    // Few clouds
    return isDaytime(currentTime) ? "fas fa-cloud-sun" : "fas fa-cloud-moon";
  } else if (iconCode.includes("03")) {
    // Scattered clouds
    return isDaytime(currentTime) ? "fas fa-cloud" : "fas fa-cloud-moon";
  } else if (iconCode.includes("04")) {
    // Broken clouds
    return isDaytime(currentTime) ? "fas fa-cloud" : "fas fa-cloud-moon";
  } else if (iconCode.includes("09")) {
    // Shower rain
    return "fas fa-cloud-showers-heavy";
  } else if (iconCode.includes("10")) {
    // Rain
    return "fas fa-cloud-rain";
  } else if (iconCode.includes("11")) {
    // Thunderstorm
    return "fas fa-bolt";
  } else if (iconCode.includes("13")) {
    // Snow
    return "fas fa-snowflake";
  } else if (iconCode.includes("50")) {
    // Mist
    return "fas fa-smog";
  } else {
    return "fas fa-question"; // Default icon
  }
};

// Function to check if it's daytime or nighttime based on current time
const isDaytime = (currentTime) => {
  const currentHour = new Date(currentTime).getHours();
  return currentHour >= 6 && currentHour < 18; // Assuming daytime is from 6 AM to 6 PM
};

const weatherData = await getWeatherData(lat, lng, APIkey);
const monthlyWeatherData = await getWeatherDataMonth(lat, lng, APIkey);
</script>

<style scoped>
.weather-info-item {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 0.5rem;
  text-align: center;
}
.weather-info-item p {
  margin: 0.5rem 0;
}
</style>
