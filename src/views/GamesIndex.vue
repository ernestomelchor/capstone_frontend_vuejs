<template>
  <div class="games-index">
    <h1>{{ message }}</h1>
    <div v-for="game in games">
      <!-- I need to get the player_game_id so I can enter it as a parameter for the destroyPlayerGame(game) action, that's what I'm trying to do below -->
      <!-- <div v-for="player in game.player_games">
        <b>Player's ID and PlayerGame associated with this game: {{ player }}</b>
      </div>-->
      <img :src="`${game.field.image_url}`" alt="Picture of Soccer Field" />
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
      <h3>
        <b>Number of People Attending So Far:</b>
        {{ game.players_attending }}
      </h3>
      <!-- Insert Buttons Here -->
      <div>
        <button>
          <router-link v-bind:to="`/games/${game.id}`">
            <b>More Info</b>
          </router-link>
        </button>
      </div>
      <br />
      <div>
        <button v-if="!game.attending" v-on:click="createPlayerGame(game)">
          <b>Attend Game</b>
        </button>
        <!-- This button below does not work because I am giving it a game.id instead of a player_game.id which I don't know how to access at this time -->
        <button v-if="game.attending" v-on:click="destroyPlayerGame(game)">
          <b>Cancel Attendance</b>
        </button>
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
      message: "Come Join a Game!",
      games: []
    };
  },
  created: function() {
    axios.get("/api/games").then(response => {
      console.log("All Games:", response.data);
      this.games = response.data;
    });
  },
  methods: {
    createPlayerGame: function(game) {
      var params = {
        game_id: game.id
      };
      axios.post("/api/player_games", params).then(response => {
        game.attending = true;
        this.games.forEach(function(game) {
          if (game.id === params.game_id) {
            game.players_attending++;
          }
        });
      });
    },
    destroyPlayerGame: function(game) {
      var params = {
        player_game_id: game.id
      };
      axios.delete("/api/player_games/" + game.id).then(response => {
        game.attending = false;
      });
    }
  }
};
</script>
