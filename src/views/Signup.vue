<template>
  <div class="signup text-white text-center">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>Signup</h1>
        <h5>Already have an account yet?</h5>
        <h5>
          <a href="/login">Log in!</a>
        </h5>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>
            <b>Name:</b>
          </label>
          <input type="text" class="form-control" v-model="name" />
        </div>
        <div class="form-group">
          <label>
            <b>Email:</b>
          </label>
          <input type="email" class="form-control" v-model="email" />
        </div>
        <div class="form-group">
          <label>
            <b>Password:</b>
          </label>
          <input type="password" class="form-control" v-model="password" />
        </div>
        <div class="form-group">
          <label>
            <b>Confirm Password:</b>
          </label>
          <input type="password" class="form-control" v-model="passwordConfirmation" />
        </div>
        <div class="form-group">
          <label>
            <b>Home Address:</b>
          </label>
          <input type="text" class="form-control" v-model="address" />
        </div>
        <div class="form-group">
          <label>
            <b>Preferred Position:</b>
          </label>
          <input type="text" class="form-control" v-model="position" />
        </div>
        <div class="form-group">
          <label>
            <b>Birthday:</b>
          </label>
          <input type="date" class="form-control" v-model="dob" />
        </div>
        <div class="form-group">
          <label>
            <b>Level (recreational or competitive only):</b>
          </label>
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