<template>
  <div class="games-show">
    <img v-bind:src="game.field.image_url" alt="Picture of Soccer Field" />
    <br />
    <button>Join Game</button>
    <br />
    <h3>
      <b>When:</b>
      {{ game.scheduled }}
    </h3>
    <h3>
      <b>Where:</b>
      {{ game.field.name }}
    </h3>
    <h3>
      <b>Address:</b>
      {{ game.field.address }}
    </h3>
    <b>Players Attending:</b>
    <div v-for="player in game.players_attending" :key="player.id">
      <h3>{{ player.name }}</h3>
    </div>
    <router-link to="/games">
      <b>Back to All Games</b>
    </router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      game: { field: {} }
    };
  },
  created: function() {
    axios.get("/api/games/" + this.$route.params.id).then(response => {
      this.game = response.data;
      console.log(this.game.field);
    });
  },
  methods: {}
};
</script>