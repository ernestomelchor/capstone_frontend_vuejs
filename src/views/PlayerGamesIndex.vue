<template>
  <div class="player-games-index text-white text-center">
    <!-- Portfolio Section Heading-->
    <h2 class="page-section-heading text-center text-uppercase text-secondary mb-3">
      Games You Are Attending:
      <br />
      {{ playerGames.length }}
    </h2>
    <h2 v-if="playerGames.length === 0">Sign up for a game today!</h2>
    <!-- Icon Divider-->
    <div class="divider-custom">
      <div class="divider-custom-line"></div>
      <div class="divider-custom-icon">
        <i class="fas fa-futbol animation-target"></i>
      </div>
      <div class="divider-custom-line"></div>
    </div>
    <div class="searchbar container-fluid mb-4">
      Search:
      <input
        class="container-fluid text-center"
        type="text"
        placeholder="Keyword"
        v-model="filterText"
      />
      Results: {{ filterBy(playerGames, filterText).length }}
    </div>
    <div v-for="(playerGame, index) in filterBy(playerGames, filterText)">
      <!-- Portfolio Section-->
      <section class="page-section portfolio" id="portfolio">
        <div class="container">
          <!-- Portfolio Grid Items-->
          <div class="row">
            <!-- Portfolio Item 1-->
            <div class="col">
              <div
                class="portfolio-item mx-auto"
                data-toggle="modal"
                v-bind:data-target="`#portfolioModal${index}`"
              >
                <div
                  class="portfolio-item-caption d-flex align-items-center justify-content-center h-100 w-100"
                >
                  <div class="portfolio-item-caption-content text-center text-white">
                    <i class="fas fa-futbol fa-2x"></i>
                  </div>
                </div>
                <img
                  :src="`${playerGame.field_image}`"
                  alt="Picture of Soccer Field You Are Attending"
                />
                <h3>
                  <br />When
                </h3>
                <h6>
                  <li class="attendance">{{ playerGame.game_date_time }}</li>
                </h6>
                <h3>Where</h3>
                <h6>
                  <li class="attendance">{{ playerGame.game_field.name }}</li>
                </h6>
                <h3>Address</h3>
                <h6>
                  <li class="attendance">{{ playerGame.game_field.address }}</li>
                </h6>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Portfolio Modals-->
      <!-- Portfolio Modal 1-->
      <div
        class="portfolio-modal modal fade"
        v-bind:id="`portfolioModal${index}`"
        tabindex="-1"
        role="dialog"
        aria-labelledby="portfolioModal1Label"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-xl" role="document">
          <div class="modal-content">
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">
                <i class="fas fa-times"></i>
              </span>
            </button>
            <div class="modal-body text-center">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-lg-8">
                    <!-- Portfolio Modal - Title-->
                    <h2
                      class="portfolio-modal-title text-secondary text-uppercase mb-0"
                    >{{ playerGame.game_field.name}}</h2>
                    <!-- Icon Divider-->
                    <div class="divider-custom">
                      <div class="divider-custom-line"></div>
                      <div class="divider-custom-icon">
                        <i class="fas fa-futbol animation-target"></i>
                      </div>
                      <div class="divider-custom-line"></div>
                    </div>
                    <!-- Portfolio Modal - Image-->
                    <img class="img-fluid rounded mb-4" :src="`${playerGame.field_image}`" alt />
                    <!-- Portfolio Modal - Text-->
                    <h3 class="mb-4">{{ playerGame.game_field.address }}</h3>
                    <h3 class="mb-4">{{ playerGame.game_date_time }}</h3>
                    <div>
                      <button v-on:click="goTo()">
                        <router-link v-bind:to="`/games/${playerGame.game_id}`">
                          <b>See Full Game Page</b>
                        </router-link>
                      </button>
                    </div>
                    <br />
                    <button class="btn btn-primary" href="#" data-dismiss="modal">
                      <i class="fas fa-times fa-fw"></i>Close Window
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],

  data: function() {
    return {
      playerGames: [],
      filterText: ""
    };
  },
  created: function() {
    axios.get("/api/player_games").then(response => {
      console.log("Games You Are Attending", response);
      this.playerGames = response.data;
    });
  },
  methods: {
    goTo: function() {
      window.location.reload();
    }
  }
};
</script>