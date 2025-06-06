<template>
  <div class="product-manager">
    <h2>Gerenciar Produtos</h2>
    <form @submit.prevent="addProduct">
      <input v-model="newProduct.name" placeholder="Nome do produto" required />
      <input v-model.number="newProduct.price" type="number" placeholder="Preço" required />
      <button type="submit">Adicionar</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Preço</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products" :key="index">
          <td>{{ product.name }}</td>
          <td>R$ {{ product.price.toFixed(2) }}</td>
          <td><button @click="confirmDelete(index)">Excluir</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'ProductManager',
  data() {
    return {
      products: [],
      newProduct: {
        name: '',
        price: null
      }
    }
  },
  methods: {
    async fetchProducts() {
      const res = await axios.get('http://localhost:3000/api/products')
      this.products = res.data
    },
    async addProduct() {
      await axios.post('http://localhost:3000/api/products', this.newProduct)
      this.newProduct = { name: '', price: null }
      this.fetchProducts()
    },
    async confirmDelete(index) {
      const result = await Swal.fire({
        title: 'Tem certeza?',
        text: `Deseja excluir "${this.products[index].name}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#aaa',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
      })

      if (result.isConfirmed) {
        await this.deleteProduct(index)
        await Swal.fire({
        title: 'Excluído!',
        text: 'O produto foi excluído com sucesso.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        willClose: () => {
          this.fetchProducts()}
        })
    }
    },
    async deleteProduct(index) {
      await axios.delete(`http://localhost:3000/api/products/${index}`)
      this.fetchProducts()
    }
  },
  mounted() {
    this.fetchProducts()
  }
}
</script>

<style scoped>
.product-manager {
  text-align: center;
  padding: 30px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

form {
  margin-bottom: 30px;
}

input {
  padding: 8px;
  margin-right: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  background-color: #f78fb3;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 6px;
  cursor: pointer;
}

button:hover {
  background-color: #e76b91;
}

table {
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>
