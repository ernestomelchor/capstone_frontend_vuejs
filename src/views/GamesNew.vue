<template>
  <div class="container">
    <h1>Schedule Your Own Game!</h1>
    <form v-on:submit.prevent="createGame()">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      <div>
        Full Soccer Field Address:
        <input type="number" v-model="newFieldId" />
      </div>
      <div>
        Date and Time:
        <input type="datetime-local" v-model="newDateTime" />
      </div>
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
      errors: []
    };
  },
  created: function() {},
  methods: {
    createGame: function() {
      var params = {
        field_id: this.newFieldId,
        date_time: this.newDateTime
      };
      axios
        .post("/api/games", params)
        .then(response => {
          this.$router.push("/games");
        })
        .catch(error => {
          console.log(error.response);
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
