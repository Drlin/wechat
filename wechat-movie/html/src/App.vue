<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
  }
}
</script>

<style>
body, p, div, h1, h2, h3, h4, h5, input, ul, li, a, label {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -webkit-tap-highlight-color:rgba(255,255,255,0);
}
html {
  font-size: 62.5%;
}
input {
  outline: none;
  border: 0;
}
a {
  text-decoration: none;
  color: #303030;
}
::-webkit-scrollbar { 
  width: 0;
  height: 0;
}
li {
  list-style: none;
}
textarea {
  outline: none;
  border: none;
}
input,
button,
textarea {
 -webkit-appearance: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
