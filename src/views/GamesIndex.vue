<template>
  <div class="games-index text-white text-center">
    <ul>
      <li class="text-danger" v-for="error in errors">{{ error }}</li>
    </ul>
    <h1 v-if="jwt">{{ message }}</h1>
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

    <br />
    <div v-if="jwt" id="map"></div>
    <br />
    <br />

    <div v-for="game in games">
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
/* global mapboxgl, mapboxSdk */

// @ is an alias to /src
import axios from "axios";
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld
  },
  data: function() {
    return {
      message: "Come Join a Game!",
      games: [],
      jwt: null,
      status: "",
      errors: [],
      places: [
        {
          address: "5099 N Albany Ave, Chicago, IL 60625",
          description: "Chicago Celtic Training Field"
        },
        {
          address: "3373 N Rockwell St, Chicago, IL 60618",
          description: "Clark Turf Field"
        },
        {
          address: "Lakefront Trail, Chicago, IL 60640",
          description: "Foster Turf Field"
        },
        {
          address: "4430 S Marshfield Ave, Chicago, IL 60609",
          description: "Davis Square Park Field"
        },
        {
          address: "1778 N John C, N Cannon Dr, Chicago, IL 60614",
          description: "Lincoln Park Turf Field"
        },
        {
          address: "1440 N Humboldt Dr, Chicago, IL 60622",
          description: "All State Field"
        },
        {
          address: "330 W Webster Ave, Chicago, IL 60614",
          description: "Parker Field"
        },
        {
          address: "2741 W Montrose Ave, Chicago, IL 60618",
          description: "Horner Park Mini-Pitch"
        }
      ]
    };
  },
  mounted: function() {
    mapboxgl.accessToken = process.env.VUE_APP_SOCCER_API_KEY;
    var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
    var map = new mapboxgl.Map({
      container: "map", // container id
      style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
      center: [-87.6298, 41.8781], // starting position [lng, lat]
      zoom: 9 // starting zoom
    });
    this.places.forEach(place => {
      mapboxClient.geocoding
        .forwardGeocode({
          query: place.address,
          autocomplete: false,
          limit: 1
        })
        .send()
        .then(function(response) {
          if (
            response &&
            response.body &&
            response.body.features &&
            response.body.features.length
          ) {
            var feature = response.body.features[0];
            var popup = new mapboxgl.Popup({ offset: 25 }).setText(
              place.description
            );
            new mapboxgl.Marker()
              .setLngLat(feature.center)
              .setPopup(popup)
              .addTo(map);
          }
        });
    });
  },
  created: function() {
    this.setJwt();
    axios
      .get("/api/games")
      .then(response => {
        console.log("All Games:", response.data);
        this.games = response.data;
      })
      .catch(error => {
        console.log("Games Index error", error.response);
        this.errors = error.response.data.errors;
        this.status = error.response.status;
      });
  },
  methods: {
    createPlayerGame: function(game) {
      var params = {
        game_id: game.id
      };
      axios
        .post("/api/player_games", params)
        .then(response => {
          game.attending = true;
          this.games.forEach(function(game) {
            if (game.id === params.game_id) {
              game.players_attending++;
            }
          });
        })
        .catch(errors =>
          console.log("PlayerGames error", errors.response.data)
        );
    },
    destroyPlayerGame: function(game) {
      var params = {
        player_game_id: game.id
      };
      axios.delete("/api/player_games/" + game.id).then(response => {
        game.attending = false;
        this.games.forEach(function(game) {
          if (game.id === params.game_id) {
            game.players_attending--;
          }
        });
      });
    },
    setJwt: function() {
      this.jwt = localStorage.jwt;
    }
  }
};
</script>
