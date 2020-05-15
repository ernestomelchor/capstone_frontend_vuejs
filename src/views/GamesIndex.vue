<template>
  <div class="games-index text-white text-center">
    <h1>{{ message }}</h1>
    <br />
    <div v-for="game in games">
      <div v-for="player in game.player_games">
        <!-- <b>{{ player.player_game_id }}</b> -->
      </div>
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
        <button>
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
        .catch(errors => console.log(errors.response.data));
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
