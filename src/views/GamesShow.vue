<template>
  <div class="games-show text-white text-center">
    <h1 class="mb-3">Game Info</h1>
    <img v-bind:src="game.field.image_url" alt="Picture of Soccer Field" />
    <br />
    <div>
      <br />
      <button class="btn btn-primary" v-if="!game.attending" v-on:click="createPlayerGame(game)">
        <b>Attend Game</b>
      </button>
      <!-- This button below does not work because I am giving it a game.id instead of a player_game.id which I don't know how to access at this time -->
      <button class="btn btn-primary" v-if="game.attending" v-on:click="destroyPlayerGame(game)">
        <b>Cancel Attendance</b>
      </button>
    </div>
    <br />
    <h3>
      <u>When</u>
    </h3>
    <h5>{{ game.scheduled }}</h5>
    <h3>
      <br />
      <u>Where</u>
    </h3>
    <h5>{{ game.field.name }}</h5>
    <h3>
      <br />
      <u>Address</u>
    </h3>
    <h5>{{ game.field.address }}</h5>
    <h3>
      <br />
      <u>Players Attending:</u>
    </h3>
    <div v-for="player in game.players_attending">
      <h5>{{ player.name }}</h5>
    </div>
    <br />
    <router-link class="btn btn-primary" to="/games">
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
  methods: {
    createPlayerGame: function(game) {
      console.log("Create Player Game", game);
      var params = {
        game_id: game.id
      };
      axios.post("/api/player_games", params).then(response => {
        console.log(response.data);
        game.attending = true;
        if (game.id === params.game_id) {
          game.players_attending.push({ name: response.data.player_name });
        }
      });
    },
    destroyPlayerGame: function(game) {
      var params = {
        player_game_id: game.id
      };
      axios.delete("/api/player_games/" + game.id).then(response => {
        game.attending = false;
        window.location.reload();
      });
    }
  }
};
</script>