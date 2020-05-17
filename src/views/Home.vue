<template>
  <div class="home">
    <!-- Masthead-->
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
        <p class="masthead-subheading font-weight-light mb-0">{{ subTitle }}</p>
      </div>
    </header>
  </div>
</template>

<style>
</style>

<script>
export default {
  data: function() {
    return {
      message: "Soccer App!",
      subTitle: "Welcome to the beautiful game"
    };
  },
  created: function() {},
  methods: {}
};
</script>
