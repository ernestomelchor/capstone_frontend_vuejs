<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/games">All Games</router-link>|
      <router-link to="/about">About</router-link>|
    </div>
    <router-view />
  </div>
</template>

<style>
body {
  background-image: url("./views/images/soccer_ball.jpg");
  background-size: cover;
  background-position: center;
  height: 100vh;
}
h1,
h4,
p {
  color: aliceblue;
}
img {
  max-width: 100%;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 20px;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
