<template>
  <div class="home">
    <!-- Masthead-->
    <div class="soccer"></div>
    <header class="masthead bg-primary text-white text-center">
      <div class="container d-flex align-items-center flex-column">
        <!-- Masthead Avatar Image-->
        <img class="masthead-avatar mb-5" src="assets/img/avataaars.svg" alt />
        <!-- Masthead Heading-->
        <h1 class="masthead-heading text-uppercase mb-0">{{ message }}</h1>
        <!-- Icon Divider-->
        <div class="divider-custom divider-light">
          <div class="divider-custom-line"></div>
          <div class="divider-custom-icon">
            <i class="fas fa-futbol animation-target"></i>
          </div>
          <div class="divider-custom-line"></div>
        </div>
        <!-- Masthead Subheading-->
        <p class="masthead-subheading font-weight-light mb-4">{{ subTitle }}</p>
        <h3 class="masthead-subheading font-weight-light mb">
          Here for a demo? Login using email "{{ dummyEmail }}" and password "{{ dummyPassword }}"
          <a
            href="/login"
          >here!</a>
        </h3>
      </div>
    </header>
  </div>
</template>

<style>
</style>

<script>
export default {
  data: function () {
    return {
      message: "Soccer App!",
      subTitle: "Welcome to the beautiful game in Chicago",
      dummyEmail: "test@example.com",
      dummyPassword: "passTheBall",
    };
  },
  created: function () {},
  methods: {},
};
</script>
