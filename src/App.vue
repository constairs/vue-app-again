<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style lang="scss">
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
  background: #001f24 url('./assets/main.png') bottom right no-repeat;
  background-attachment: fixed;
  background-size: 368px 300px;

  @media screen and (max-width: 1024px) {
    background: #001f24;
  }
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f0f0f0;
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 0;
}

input {
  height: 45px;
  width: 100%;
  max-width: 100%;
  border-radius: 4px;
  text-indent: 10px;
  border: 1px solid #82DDF0;
  background-color: #001f24;
  color: #ffffff;
  font-size: 16px;
  outline: none;
}

input:hover,
input:focus,
textarea:hover,
textarea:focus {
  border-color: #5296A5;
}

textarea {
  width: 100%;
  text-indent: 8px;
  padding-left: 2px;
  max-width: 100%;
  min-width: 100%;
  max-height: 400px;
  min-height: 80px;
  border-radius: 4px;
  border: 1px solid #82DDF0;
  background-color: #001f24;
  color: #ffffff;
  outline: none;
  font-size: 16px;
}

label {
  text-align: left;
  font-size: 12px;
  display: block;
  margin-bottom: 4px;
}
</style>
