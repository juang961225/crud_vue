<template>
  <div id="app">
    <header class="main-header">
      <h1>Bienvenido a tu aplicación Vue.js</h1>
      <button @click="toggleNav" class="menu-button">&#9776;</button>
      <nav :class="{ 'show-nav': showNav }">
        <router-link to="/products" class="nav-link" @click-link="showNav = false">
          Lista de productos
        </router-link>
        <router-link to="/orders" class="nav-link" @click-link="showNav = false">
          Lista de pedidos
        </router-link>
        <router-link to="/create-order" class="nav-link" @click-link="showNav = false">
          Crear pedido
        </router-link>
        <router-link to="/login" class="nav-link" @click-link="showNav = false">
          Login
        </router-link>
        <router-link to="/register" class="nav-link" @click-link="showNav = false">
          register
        </router-link>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      showNav: false,
    };
  },
  methods: {
    toggleNav() {
      this.showNav = !this.showNav;
    },
  },
};
</script>

<style scoped>
/* estilos globales */
body {
  font-family: 'Roboto', sans-serif;
  margin: 0;
  background-color: #f5f5f5;
}

.main-header {
  background-color: #37474f;
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h1 {
  font-size: 1.5rem;
  font-weight: 500;
  color: white;
  margin: 0;
}

nav {
  display: flex;
  align-items: center;
}

.nav-link {
  padding: 0.5rem 1rem;
  text-decoration: none;
  color: white;
  font-size: 1rem;
  margin-right: 1rem;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.nav-link:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

nav a:last-child {
  margin-right: 0;
}

.menu-button {
  display: none;
  font-size: 1.5rem;
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
}

.show-nav {
  display: flex;
}

@media (max-width: 768px) {
  .menu-button {
    display: inline-block;
  }

  nav {
    display: none;
    z-index: 2;
  }

  .show-nav {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #37474f;
    border-radius: 0 0 0.5rem 0.5rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .nav-link {
    margin: 0;
    padding: 0.5rem 1rem;
  }
}
</style>