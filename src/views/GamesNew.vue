<template>
  <div class="container">
    <h1>Schedule Your Own Game!</h1>
    <form v-on:submit.prevent="createGame()">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      Where:
      <input type="list" v-model="newFieldId" />
      When:
      <input type="text" v-model="newDateTime" />
      <input type="submit" value="Create" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      newFieldId: "",
      newDateTime: "",
      newPhotoHeight: "",
      errors: [],
    };
  },
  created: function() {},
  methods: {
    createGame: function() {
      var params = {
        field_id: this.newFieldId,
        date_time: this.newDateTime,
      };
      axios
        .post("/api/games", params)
        .then((response) => {
          this.$router.push("/games");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
