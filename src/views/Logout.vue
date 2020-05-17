<template>
  <div class="logout text-white"></div>
</template>

<script>
import axios from "axios";

export default {
  created: function() {
    delete axios.defaults.headers.common["Authorization"];
    localStorage.removeItem("jwt");
    this.$router.push("/");
    window.location.reload();
  }
};
</script>