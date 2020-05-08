<template>
  <div class="games-index">
    <h1>{{ message }}</h1>
    <h1>{{ games }}</h1>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "The Beautiful Game!",
      games: [],
    };
  },
  created: function() {
    axios.get("/api/games").then((response) => {
      this.games = response.data;
    });
  },
  methods: {},
};
</script>
