<template>
  <div id="app">
    <header class="header">
      <h1>🍰 Sweet Dreams 🍰</h1>
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/produtos">Gerenciar Produtos</router-link> |
        <router-link to="/pedidos">Gerenciar Pedidos</router-link> |
        <router-link to="/despesas">Gerenciar Despesas</router-link>
      </nav>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  text-align: center;
}

.header {
  background-color: #f8c6d8;
  padding: 20px;
  border-bottom: 4px solid #f78fb3;
}

.header h1 {
  margin: 0 0 10px 0;
  font-size: 2.5em;
}

nav a {
  color: #f78fb3;
  font-weight: bold;
  margin: 0 10px;
  text-decoration: none;
}

nav a.router-link-exact-active {
  text-decoration: underline;
}
</style>
