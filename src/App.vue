@import url('https://fonts.googleapis.com/css2?family=Ubuntu:ital,wght@1,700&display=swap');
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/games">All Games</router-link>|
      <router-link to="/games/new">Create Game</router-link>|
      <router-link to="/about">About</router-link>|
      <router-link to="/signup">Signup</router-link>|
      <router-link to="/login">Login</router-link>|
      <router-link to="/logout">Logout</router-link>
    </div>
    <router-view />
  </div>
</template>

<style>
html {
  background: url("./views/images/soccer_field.jpeg") no-repeat center center
    fixed;
  background-size: cover;
  height: 100%;
}
li {
  list-style: none;
  color: red;
}
img {
  width: 50%;
  max-height: 75vh;
}
#app {
  font-family: "Ubuntu", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f7f7f7;
}

#nav {
  padding: 20px;
}

#nav a {
  font-weight: bold;
  color: #f7f7f7;
}

#nav a.router-link-exact-active {
  color: #f7f7f7;
}
</style>
