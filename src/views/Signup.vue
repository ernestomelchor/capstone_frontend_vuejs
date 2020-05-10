<template>
  <div class="signup">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>Signup</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>Name:</label>
          <input type="text" class="form-control" v-model="name" />
        </div>
        <div class="form-group">
          <label>Email:</label>
          <input type="email" class="form-control" v-model="email" />
        </div>
        <div class="form-group">
          <label>Password:</label>
          <input type="password" class="form-control" v-model="password" />
        </div>
        <div class="form-group">
          <label>Password confirmation:</label>
          <input type="password" class="form-control" v-model="passwordConfirmation" />
        </div>
        <div class="form-group">
          <label>Home Address:</label>
          <input type="text" class="form-control" v-model="address" />
        </div>
        <div class="form-group">
          <label>Preferred Position:</label>
          <input type="text" class="form-control" v-model="position" />
        </div>
        <div class="form-group">
          <label>Birthday:</label>
          <input type="date" class="form-control" v-model="dob" />
        </div>
        <div class="form-group">
          <label>Level(recreational or competitive only):</label>
          <input type="text" class="form-control" v-model="level" />
        </div>
        <input type="submit" class="btn btn-primary" value="Submit" />
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
      email: "",
      password: "",
      passwordConfirmation: "",
      address: "",
      position: "",
      dob: "",
      level: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        name: this.name,
        email: this.email,
        password: this.password,
        password_confirmation: this.passwordConfirmation,
        address: this.address,
        position: this.position,
        dob: this.dob,
        level: this.level
      };
      axios
        .post("/api/players", params)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>