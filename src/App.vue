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
li {
  list-style: none;
  color: red;
}
img {
  width: 75vh;
  max-height: 75vh;
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
