<template>
  <div class="fields-new text-white text-center">
    <img
      v-if="status"
      v-bind:src="`https://http.cat/${status}`"
      alt="HTTP Status Cat (visit https://http.cat/ fore more info"
    />
    <div class="container">
      <h1>New Field</h1>
      <form v-on:submit.prevent="submit()">
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <div>
            <b>Name:</b>
            <input type="text" class="form-control" v-model="name" />
          </div>
          <br />
          <div>
            <b>Address:</b>
            <input type="text" class="form-control" v-model="address" />
          </div>
          <br />
          <div>
            <b>Open Time:</b>
            <input type="datetime-local" class="form-control" v-model="open_time" />
          </div>
          <br />
          <div>
            <b>Close Time:</b>
            <input type="datetime-local" class="form-control" v-model="close_time" />
          </div>
          <br />
          <div>
            <b>Image:</b>
            <input
              type="file"
              class="btn btn-primary"
              v-on:change="setFile($event)"
              ref="fileInput"
            />
          </div>
          <br />
          <div>
            <input type="submit" class="btn btn-primary" value="Submit" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      address: "",
      open_time: "",
      close_time: "",
      image_url: "",
      errors: [],
      status: ""
    };
  },
  created: function() {},
  methods: {
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.image_url = event.target.files[0];
      }
    },
    submit: function() {
      var formData = new FormData();
      formData.append("name", this.name);
      formData.append("address", this.address);
      formData.append("open_time", this.open_time);
      formData.append("close_time", this.close_time);
      formData.append("image_url", this.image_url);
      axios
        .post("/api/fields", formData)
        .then(response => {
          this.name = "";
          this.address = "";
          this.open_time = "";
          this.close_time = "";
          this.$refs.fileInput.value = "";
        })
        .catch(error => {
          console.log("Fields create error", error.response);
          this.errors = error.response.data.errors;
          this.status = error.response.status;
        });
    }
  }
};
</script>