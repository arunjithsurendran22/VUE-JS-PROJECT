<template>
  <div class="flex flex-col flex-1 items-center">
    <!-- banner -->
    <div
      v-if="router.query.preview"
      class="text-white p-4 bg-weather-secondary w-full text-center"
    >
      <p>
        You are currently previewing this city ,click the + icon to start tracking this
        city
      </p>
    </div>
    <!-- weather overview -->
    <div class="flex flex-col items-center text-white py-12">
      <h1 class="text-4xl mb-2">{{ router.params.city }}</h1>
      <p class="text-sm mb-12">
        {{
          new Date(weatherData.currentTime).toLocaleDateString("en-us", {
            weekday: "short",
            day: "2-digit",
            month: "long",
          })
        }}
        {{
          new Date(weatherData.currentTime).toLocaleTimeString("en-us", {
            timeStyle: "short",
          })
        }}
      </p>
      <p class="text-8xl mb-8">{{ Math.round(weatherData.current.temp) }}&deg;</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      `https://api.openweathermap.org/data/3.0/onecall?lat=${router.query.lat}&lon=${router.query.lng}&exclude={part}&appid=60e0f4d262d24daea5eca45abc6b7ae9&units=imperial`
    );

    //calculate current date and time
    const localOffSet = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.current.dt * 1000 + localOffSet;
    weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone_offset;

    //calculate hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffSet;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });
    return weatherData.data;
  } catch (error) {
    console.log(error);
  }
};
const weatherData = await getWeatherData();
console.log(weatherData);
</script>
