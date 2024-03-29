<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        type="text"
        v-model="searchQuery"
        @input="getSearchResults"
        placeholder="Search for a city or State"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <ul
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
        v-if="mapboxSearchResults"
      >
        <p v-if="searchError">Sorry something went wrong, please try again</p>
        <p v-else-if="mapboxSearchResults && mapboxSearchResults.length === 0">
          No results match your query, try a different term
        </p>
        <template v-else>
          <li
            v-for="searchResult in mapboxSearchResults"
            :key="searchResult.id"
            class="py-2 cursor-pointer"
            @click="previewCity(searchResult)"
          >
            {{ searchResult.place_name }}
          </li>
        </template>
      </ul>
    </div>
  </main>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const previewCity = (searchResult) => {
  const [city, state] = searchResult.place_name.split(",");
  console.log(city, state);
  const trimmedState = state.replaceAll(" ","")

  router.push({
    name: "CityView",
    params: { state: trimmedState, city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};

const mapBoxAPIKey =
  "pk.eyJ1IjoiYXJ1bmppdGhzdXJlbmRyYW4iLCJhIjoiY2x0a2J2OXQ3MHVrbzJqbzE0MW1semZmNCJ9.HvCIQ_P6rIKrSmqe5b3b9A";

const searchQuery = ref("");
const queryTimeout = ref(null);
const mapboxSearchResults = ref(null);
const searchError = ref(false); // Initialize error state to false

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  searchError.value = false; // Reset error state
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const result = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery.value}.json?access_token=${mapBoxAPIKey}`
        );
        mapboxSearchResults.value = result.data.features;
        console.log(mapboxSearchResults.value);
      } catch (error) {
        searchError.value = true;
        console.log(error);
      }
    } else {
      mapboxSearchResults.value = null;
    }
  }, 300);
};
</script>

<style scoped></style>
