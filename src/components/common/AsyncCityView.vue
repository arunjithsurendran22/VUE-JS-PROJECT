<template>
  <div class="flex flex-col flex-1 items-center bg-gray-900 text-white py-12">
    <!-- banner -->

    <!-- weather overview -->
    <div v-if="weatherData" class="flex flex-col items-center">
      <!-- Location and Icon -->
      <h1 class="text-3xl md:text-5xl font-semibold mb-4">
        {{ weatherData.location.name }}, {{ weatherData.location.region }}
      </h1>
      <img
        :src="weatherData.current.condition.icon"
        alt="Weather Icon"
        class="w-20 h-20"
      />

      <!-- Last Updated Time -->
      <p class="text-sm mb-8">
        Updated:
        {{
          new Date(weatherData.current.last_updated).toLocaleString("en-IN", {
            hour: "numeric",
            minute: "numeric",
          })
        }}
      </p>

      <!-- Temperature and Condition -->
      <div class="text-center text-6xl mb-8">
        <p class="text-7xl">{{ Math.round(weatherData.current.temp_c) }}°C</p>
        <p class="text-2xl mt-5">{{ weatherData.current.condition.text }}</p>
      </div>

      <!-- Additional Weather Information -->
      <div class="grid grid-cols-3 gap-4 text-center w-full max-w-lg p-10 rounded-xl bg-gray-800 shadow-md">
        <div class="text-gray-400">
          <p class="text-sm italic font-semibold">Wind Speed</p>
          <p class="text-xl">{{ weatherData.current.wind_kph }} km/h</p>
        </div>
        <div class="text-gray-400">
          <p class="text-sm italic font-semibold">Humidity</p>
          <p class="text-xl">{{ weatherData.current.humidity }}%</p>
        </div>
        <div class="text-gray-400">
          <p class="text-sm italic font-semibold">Visibility</p>
          <p class="text-xl">{{ weatherData.current.vis_km }} km</p>
        </div>
        <div class="text-gray-400">
          <p class="text-sm italic font-semibold">Cloudiness</p>
          <p class="text-xl">{{ weatherData.current.cloud }}%</p>
        </div>
        <div class="text-gray-400">
          <p class="text-sm italic font-semibold">Air Pressure</p>
          <p class="text-xl">{{ weatherData.current.pressure_mb }} hpa</p>
        </div>
        <div class="text-gray-400">
          <p class="text-sm italic font-semibold">UV</p>
          <p class="text-xl">{{ weatherData.current.uv }}</p>
        </div>
      </div>
    </div>

    <!-- Weather Forecast Table -->
    <div v-if="weatherDataTen" class="mt-10">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-800">
          <thead class="bg-gray-800">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Date
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Day
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Weather
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
              >
                Min/Max Temp (°C)
              </th>
            </tr>
          </thead>
          <tbody class="bg-gray-900 divide-y divide-gray-800">
            <tr
              v-for="dayData in weatherDataTen.forecast.forecastday"
              :key="dayData.date"
            >
              <td class="px-6 py-4 whitespace-nowrap">{{ formatDate(dayData.date) }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ getDayOfWeek(dayData.date) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <img
                  :src="dayData.day.condition.icon"
                  alt="Weather Icon"
                  class="w-8 h-8"
                />
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ Math.round(dayData.day.mintemp_c) }}°C ~
                {{ Math.round(dayData.day.maxtemp_c) }}°C
              </td>
            </tr>
          </tbody>
        </table>
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
const day = 10;
const APIkey = "fc0f79a144e9415ca3f70223241003";

console.log(city);
const cityData =city.split(" ")
const newCity =cityData[0]
const getWeatherData = async (city, APIkey) => {
  try {
    console.log(city);
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${city}&aqi=no`
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
const getTenDaysData = async (city, day, APIkey) => {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/forecast.json?key=${APIkey}&q=${city}&days=${day}&aqi=no&alerts=no`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const weatherData = await getWeatherData(newCity, APIkey);
const weatherDataTen = await getTenDaysData(newCity, day, APIkey);

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getDayOfWeek = (dateString) => {
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const date = new Date(dateString);
  return daysOfWeek[date.getDay()];
};
</script>

<style scoped>
/* Add custom styles here */
</style>
