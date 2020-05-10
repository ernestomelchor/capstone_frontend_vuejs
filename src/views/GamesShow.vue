<template>
  <div class="container">
    <img v-bind:src="game.field.image_url" alt="Picture of Soccer Field" />
    <br />
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
    <b>Players Attending:</b>
    <div v-for="player in game.players_attending" :key="player.id">
      <p>{{ player.name }}</p>
    </div>
    <router-link to="/games">Back to All Games</router-link>
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