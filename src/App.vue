<template>
  <div id="app">
    <h1>welcome to your vue.js App</h1>
    <nav>
      <router-link to="/products">Product List</router-link>
      <router-link to="/orders">Order List</router-link>
      <router-link to="/create-order">Create order</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
/* estilos globales */
nav a {
  margin: 0 10px;
}

body {
  font-family: Georgia, 'Times New Roman', Times, serif;
}
</style>