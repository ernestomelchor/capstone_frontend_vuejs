<template>
  <div class="games-index">
    <h1>{{ message }}</h1>
    <div v-for="game in games">
      <img :src="`${game.field.image_url}`" alt="Picture of Soccer Field" />
      <p>
        <b>When:</b>
        {{ game.scheduled }}
      </p>
      <p>
        <b>Where:</b>
        {{ game.field.name }}
      </p>
      <p>
        <b>Address:</b>
        {{ game.field.address }}
      </p>
      <p>
        <b>Number of People Attending So Far:</b>
        {{ game.players_attending }}
      </p>
      <!-- Insert a Join Button Here -->
      <div>
        <button>Show Up to This Game</button>
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "The Beautiful Game!",
      games: []
    };
  },
  created: function() {
    axios.get("/api/games").then(response => {
      this.games = response.data;
    });
  },
  methods: {}
};
</script>
