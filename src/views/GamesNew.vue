<template>
  <div class="games-new text-white">
    <h1>Schedule Your Own Game!</h1>
    <form v-on:submit.prevent="createGame()">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      <div>
        <b>Soccer Field:</b>
        <select v-model="newFieldId">
          <option v-for="field in fields" v-bind:value="field.id" :key="field.id">{{ field.name }}</option>
        </select>
      </div>
      <br />
      <div>
        <b>Date and Time:</b>
        <input type="datetime-local" v-model="newDateTime" />
      </div>
      <br />
      <input type="submit" class="btn btn-primary" value="Create" />
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      fields: [],
      newFieldId: "",
      newDateTime: "",
      errors: []
    };
  },
  created: function() {
    axios.get("/api/fields").then(response => {
      console.log("All Fields:", response.data);
      this.fields = response.data;
    });
  },
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
