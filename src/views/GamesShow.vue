<template>
  <div class="games-show">
    <img v-bind:src="game.field.image_url" alt="Picture of Soccer Field" />
    <br />
    <div>
      <br />
      <button v-if="!game.attending" v-on:click="createPlayerGame(game)">
        <b>Attend Game</b>
      </button>
      <!-- This button below does not work because I am giving it a game.id instead of a player_game.id which I don't know how to access at this time -->
      <button v-if="game.attending" v-on:click="destroyPlayerGame(game)">
        <b>Cancel Attendance</b>
      </button>
    </div>
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
        this.games.forEach(function(game) {
          if (game.id === params.game_id) {
            game.players_attending--;
            location.refresh("/api/games");
          }
        });
      });
    }
  }
};
</script>