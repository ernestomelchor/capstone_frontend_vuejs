<template>
  <div class="login text-white text-center">
    <div class="container">
      <form v-on:submit.prevent="submit()">
        <h1>Login</h1>
        <h5>Don't have an account yet?</h5>
        <h5>
          <a href="/signup">Sign Up!</a>
        </h5>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
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
        <input type="submit" class="btn btn-primary" value="Submit" />
      </form>
    </div>
    <br />
    <h3
      class="masthead-subheading font-weight-light"
    >Here for a demo? Login using email "{{ dummyEmail }}" and password "{{ dummyPassword }}".</h3>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      email: "",
      password: "",
      errors: [],
      dummyEmail: "test@example.com",
      dummyPassword: "passTheBall",
    };
  },
  methods: {
    submit: function () {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/games");
          window.location.reload();
        })
        .catch((error) => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>