<template>
  <div class="flex flex-col flex-1 items-center bg-gray-900 text-white py-12">
    <!-- banner -->

    <!-- weather overview -->
    <div v-if="weatherData" class="flex flex-col items-center">
      <h1 class="text-3xl md:text-5xl font-semibold mb-4">
        {{ weatherData.location.name }}, {{ weatherData.location.region }}
      </h1>
      <img
        :src="weatherData.current.condition.icon"
        alt="Weather Icon"
        class="w-20 h-20"
      />
      <p class="text-sm mb-8">
        {{
          new Date(weatherData.current.last_updated).toLocaleDateString("en-IN", {
            weekday: "short",
            day: "2-digit",
            month: "long",
          })
        }}
        {{
          new Date(weatherData.current.last_updated).toLocaleTimeString("en-IN", {
            timeStyle: "short",
          })
        }}
      </p>
      <div class="text-center text-6xl mb-8">
        <p class="text-7xl">{{ Math.round(weatherData.current.temp_c) }}°C</p>
      </div>
      <div
        class="grid grid-cols-2 lg:grid-cols-3 md:grid-cols-2 gap-6 shadow-xl p-5 rounded-xl"
      >
        <!-- Weather Info Items -->
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
                weather
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
const getWeatherData = async (city, APIkey) => {
  try {
    const response = await axios.get(
      `http://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${city}&aqi=no`
    );
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
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const weatherData = await getWeatherData(city, APIkey);
const weatherDataTen = await getTenDaysData(city, day, APIkey);

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

<style scoped></style>
