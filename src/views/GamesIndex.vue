<template>
  <div class="games-index text-white text-center">
    <ul>
      <li class="text-danger" v-for="error in errors">{{ error }}</li>
    </ul>
    <h1 v-if="jwt">{{ message }}</h1>
    <div v-if="jwt" class="divider-custom">
      <div class="divider-custom-line"></div>
      <div class="divider-custom-icon">
        <i class="fas fa-futbol animation-target"></i>
      </div>
      <div class="divider-custom-line"></div>
    </div>
    <div v-if="!jwt">
      <h1 class="no-jwt text-center mb-5">
        <a href="/signup">Sign Up</a> or
        <a href="/login">Log In</a> Today to Access All Features!
      </h1>
      <img
        v-if="status"
        v-bind:src="`https://http.cat/${status}`"
        alt="HTTP Status Cat (visit https://http.cat/ fore more info"
      />
    </div>

    <div v-if="jwt" id="map"></div>
    <br />
    <br />
    <!-- <h3 v-if="jwt" class="mb-4 text-center">Current Weather in Chicago</h3>
    <div v-if="jwt" class="weather-widget text-center mb-4">
      <h5 class="text-white">Forecast:</h5>
      <p>{{ weather }}</p>
      <h5 class="text-white">Temp:</h5>
      <p>{{ temperature }}°F</p>
      <h5 class="text-white">Feels Like:</h5>
      <p>{{ feelsLike }}°F</p>
      <h5 class="text-white">Winds:</h5>
      <p>{{ windSpeed }}MPH</p>
    </div>-->
    <div v-if="jwt" class="searchbar container-fluid mb-4">
      Search:
      <input
        class="container-fluid text-center"
        type="text"
        placeholder="Keyword"
        v-model="filterText"
      />
      Results: {{ filterBy(games, filterText).length }}
    </div>
    <div v-for="game in filterBy(games, filterText)">
      <div v-for="player in game.player_games"></div>
      <img :src="`${game.field.image_url}`" alt="Picture of Soccer Field" />
      <h3>
        <br />When
      </h3>
      <h5>{{ game.scheduled }}</h5>
      <h3>Where</h3>
      <h5>{{ game.field.name }}</h5>
      <h3>Address</h3>
      <h5>{{ game.field.address }}</h5>
      <h3>Current Total Attending</h3>
      <h5>{{ game.players_attending }}</h5>
      <!-- Insert Buttons Here-->
      <div>
        <br />
        <button class="btn btn-primary">
          <router-link v-bind:to="`/games/${game.id}`">
            <b>More Info</b>
          </router-link>
        </button>
      </div>
      <br />
      <div>
        <button class="btn btn-primary" v-if="!game.attending" v-on:click="createPlayerGame(game)">
          <b>Attend Game</b>
        </button>
        <!-- This button below does not work because I am giving it a game.id instead of a player_game.id which I don't know how to access at this time -->
        <button class="btn btn-primary" v-if="game.attending" v-on:click="destroyPlayerGame(game)">
          <b>Cancel Attendance</b>
        </button>
      </div>
      <br />
    </div>
  </div>
</template>

<style></style>

<script>
/* global mapboxgl, mapboxSdk, MapboxDirections */

// @ is an alias to /src
import axios from "axios";
import HelloWorld from "@/components/HelloWorld.vue";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],
  name: "Home",
  components: {
    HelloWorld,
  },
  data: function () {
    return {
      message: "Come Join a Game!",
      weather: {},
      temperature: {},
      feelsLike: {},
      windSpeed: {},
      games: [],
      filterText: "",
      jwt: null,
      status: "",
      errors: [],
    };
  },
  mounted: function () {
    // var AERISID = process.env.VUE_APP_AERISWEATHER_ID;
    // var AERISKEY = process.env.VUE_APP_AERISWEATHER_SECRET;
    // const url = `https://api.aerisapi.com/observations/:auto?&format=json&filter=allstations&limit=1&fields=loc,ob.tempF,ob.windSpeedMPH,ob.weather,ob.feelslikeF&client_id=${AERISID}&client_secret=${AERISKEY}`;

    // fetch(url)
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(json => {
    //     if (!json.success) {
    //       console.log("Oh no!");
    //     } else {
    //       console.log(json);
    //       this.weather = json.response.ob.weather;
    //       this.temperature = json.response.ob.tempF;
    //       this.feelsLike = json.response.ob.feelslikeF;
    //       this.windSpeed = json.response.ob.windSpeedMPH;
    //     }
    //   });
    this.setJwt();
    axios
      .get("/api/games")
      .then((response) => {
        console.log("All Games:", response.data);
        this.games = response.data;
        this.setupMap();
      })
      .catch((error) => {
        console.log("Games Index error", error.response);
        this.errors = error.response.data.errors;
        this.status = error.response.status;
      });
  },
  methods: {
    setupMap: function () {
      mapboxgl.accessToken = process.env.VUE_APP_SOCCER_API_KEY;
      var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
      var map = new mapboxgl.Map({
        container: "map", // container id
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [-87.6298, 41.8781], // starting position [lng, lat]
        zoom: 9, // starting zoom
      });
      // disable map zoom when using scroll
      map.scrollZoom.disable();
      // Add fullscreen map option.
      map.addControl(new mapboxgl.FullscreenControl());
      // Add geolocate control to the map.
      map.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );
      // Add zoom and rotation controls to the map.
      map.addControl(new mapboxgl.NavigationControl());
      map.addControl(
        new MapboxDirections({
          accessToken: mapboxgl.accessToken,
        }),
        "top-left"
      );
      this.games.forEach((game) => {
        mapboxClient.geocoding
          .forwardGeocode({
            query: game.field_address,
            autocomplete: false,
            limit: 1,
          })
          .send()
          .then(function (response) {
            if (
              response &&
              response.body &&
              response.body.features &&
              response.body.features.length
            ) {
              var feature = response.body.features[0];
              // create the popup
              var popup = new mapboxgl.Popup({ offset: 25 }).setText(
                game.field_name
              );
              // create DOM element for the marker
              var el = document.createElement("div");
              el.id = "marker";
              // create the marker
              new mapboxgl.Marker()
                .setLngLat(feature.center)
                .setPopup(popup)
                .addTo(map);
            }
          });
      });
    },
    createPlayerGame: function (game) {
      var params = {
        game_id: game.id,
      };
      axios
        .post("/api/player_games", params)
        .then((response) => {
          game.attending = true;
          this.games.forEach(function (game) {
            if (game.id === params.game_id) {
              game.players_attending++;
            }
          });
        })
        .catch((errors) =>
          console.log("PlayerGames error", errors.response.data)
        );
    },
    destroyPlayerGame: function (game) {
      var params = {
        player_game_id: game.id,
      };
      axios.delete("/api/player_games/" + game.id).then((response) => {
        game.attending = false;
        this.games.forEach(function (game) {
          if (game.id === params.game_id) {
            game.players_attending--;
          }
        });
      });
    },
    setJwt: function () {
      this.jwt = localStorage.jwt;
    },
  },
};
</script>
