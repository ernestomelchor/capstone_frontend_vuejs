<template>
  <div class="fields-new text-white text-center">
    <h1>New Field</h1>
    <form v-on:submit.prevent="submit()">
      <ul>
        <li v-for="error in errors">{{ error }}</li>
      </ul>
      <div>
        <b>Name:</b>
        <input type="text" v-model="name" />
      </div>
      <br />
      <div>
        <b>Address:</b>
        <input type="text" v-model="address" />
      </div>
      <br />
      <div>
        <b>Open Time:</b>
        <input type="datetime-local" v-model="open_time" />
      </div>
      <br />
      <div>
        <b>Close Time:</b>
        <input type="datetime-local" v-model="close_time" />
      </div>
      <br />
      <div>
        <b>Image:</b>
        <input type="file" v-on:change="setFile($event)" ref="fileInput" />
      </div>
      <br />
      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
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
      errors: []
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
          console.log(error.response);
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>