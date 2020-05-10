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
      <!-- Insert Buttons Here -->
      <div>
        <button>See More Game Info</button>
      </div>
      <br />
      <div>
        <button>Join Game</button>
      </div>
      <br />
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "Come Play!",
      games: []
    };
  },
  created: function() {
    axios.get("/api/games").then(response => {
      console.log("All Games:", response.data);
      this.games = response.data;
    });
  },
  methods: {}
};
</script>
