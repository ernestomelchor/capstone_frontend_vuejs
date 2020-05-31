<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/games">All Games</router-link>|
      <router-link to="/games/new">Create Game</router-link>|
      <router-link to="/fields/new">Add a Field</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/signup">Sign Up</router-link>|
      <router-link to="/login">Login</router-link>|
      <router-link to="/logout">Logout</router-link>
      <router-link to="/player_games">Games Attending</router-link>
    </div>-->

    <!-- Navigation-->
    <nav class="navbar navbar-expand-lg bg-secondary text-uppercase fixed-top" id="mainNav">
      <div class="container">
        <a class="navbar-brand js-scroll-trigger" href="/">Home</a>
        <button
          class="navbar-toggler navbar-toggler-right text-uppercase font-weight-bold bg-primary text-white rounded"
          type="button"
          data-toggle="collapse"
          data-target="#navbarResponsive"
          aria-controls="navbarResponsive"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          Menu
          <i class="fas fa-bars"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item mx-0 mx-lg-1">
              <a
                class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                href="/games"
              >See All Games</a>
            </li>
            <li v-if="jwt" class="nav-item mx-0 mx-lg-1">
              <a
                class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                href="/player_games"
              >Games Attending</a>
            </li>
            <li v-if="jwt" class="nav-item mx-0 mx-lg-1">
              <a
                class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                href="/games/new"
              >Create a Game</a>
            </li>
            <li v-if="jwt" class="nav-item mx-0 mx-lg-1">
              <a
                class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger"
                href="/fields/new"
              >Add a Field</a>
            </li>

            <li class="nav-item mx-0 mx-lg-1">
              <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="/about">About</a>
            </li>
            <li v-if="!jwt" class="nav-item mx-0 mx-lg-1">
              <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="/signup">Sign Up</a>
            </li>
            <li v-if="!jwt" class="nav-item mx-0 mx-lg-1">
              <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="/login">Login</a>
            </li>
            <li v-if="jwt" class="nav-item mx-0 mx-lg-1">
              <a class="nav-link py-3 px-0 px-lg-3 rounded js-scroll-trigger" href="/logout">Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <!-- Added this div with 6 breaks for a quick fix  -->
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
    <div>
      <router-view />
    </div>
    <!-- Added this div with 2 breaks for a quick fix  -->
    <div>
      <br />
    </div>
    <!-- Footer-->
    <footer class="footer text-center">
      <div class="container">
        <div class="row">
          <!-- Footer Location-->
          <div class="col-lg-4 mb-5 mb-lg-0">
            <h4 class="text-uppercase mb-4">Headquarters</h4>
            <p class="lead mb-0">
              Chicago, Illinois
              <br />USA
            </p>
          </div>
          <!-- Footer Social Icons-->
          <div class="col-lg-4 mb-5 mb-lg-0">
            <h4 class="text-uppercase mb-4">Social Media</h4>

            <a
              class="btn btn-outline-light btn-social mx-1"
              target="_blank"
              href="https://www.linkedin.com/in/ernestomelchor/"
            >
              <i class="fab fa-fw fa-linkedin-in"></i>
            </a>
            <a
              class="btn btn-outline-light btn-social mx-1"
              target="_blank"
              href="https://github.com/ernestomelchor"
            >
              <i class="fab fa-fw fa-github"></i>
            </a>
            <a
              class="btn btn-outline-light btn-social mx-1"
              target="_blank"
              href="https://twitter.com/ernestomelchor_"
            >
              <i class="fab fa-fw fa-twitter"></i>
            </a>
            <a
              class="btn btn-outline-light btn-social mx-1"
              target="_blank"
              href="https://www.instagram.com/ernestomelchor88/"
            >
              <i class="fab fa-fw fa-instagram"></i>
            </a>
          </div>
          <!-- Footer About Text-->
          <div class="col-lg-4">
            <h4 class="text-uppercase mb-4">About Founder</h4>
            <p class="lead mb-0">
              When Ernesto is not playing soccer, he is playing around with Bootstrap themes!
              <br />
              <a target="_blank" href="http://startbootstrap.com">Start Bootstrap</a>.
            </p>
          </div>
        </div>
      </div>
    </footer>
    <!-- Copyright Section-->
    <section class="copyright py-4 text-center text-white">
      <div class="container">
        <small>Copyright © Soccer App 2020</small>
      </div>
    </section>
    <!-- Scroll to Top Button (Only visible on small and extra-small screen sizes)-->
    <div class="scroll-to-top d-lg-none position-fixed">
      <a class="js-scroll-trigger d-block text-center text-white rounded" href="#page-top">
        <i class="fa fa-chevron-up"></i>
      </a>
    </div>
  </div>
</template>

<style>
</style>

<script>
export default {
  mounted: function() {
    setupTheme();
  },
  data: function() {
    return {
      jwt: null
    };
  },
  created: function() {
    this.setJwt();
  },
  methods: {
    setJwt: function() {
      this.jwt = localStorage.jwt;
    }
  }
};
</script>
