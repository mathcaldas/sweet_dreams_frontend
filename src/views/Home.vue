<template>
  <div class="home">
    <h3>Bem-vindo(a) à sua vendinha de bolos e tortas!</h3>

    <main class="buttons">
      <router-link to="/produtos" class="btn">Gerenciar Produtos</router-link>
      <router-link to="/pedidos" class="btn">Gerenciar Pedidos</router-link>
    </main>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.home {
  text-align: center;
  background-color: #fff;
  min-height: 100vh;
  padding-top: 40px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  padding: 0 20px;
}

.btn {
  background-color: #f78fb3;
  color: white;
  padding: 15px 25px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 1em;
  font-weight: 600;
  transition: background-color 0.3s ease;
  cursor: pointer;
  display: inline-block;
}

.btn:hover {
  background-color: #e76b91;
}
</style>
