<template>
  <div class="order-manager">
    <h2>Gerenciar Pedidos</h2>

    <form @submit.prevent="addOrder">
      <select v-model="newOrder.flavor" required>
        <option disabled value="">Selecione um sabor</option>
        <option v-for="product in products" :key="product.name" :value="product.name">
          {{ product.name }}
        </option>
      </select>
      <input v-model.number="newOrder.quantity" type="number" placeholder="Quantidade" required />
      <input v-model="newOrder.client" placeholder="Cliente" required />
      <button type="submit">Adicionar Pedido</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>Sabor</th>
          <th>Quantidade</th>
          <th>Valor</th>
          <th>Cliente</th>
          <th>Pago</th>
          <th>Observações</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(order, index) in orders" :key="index">
          <td>{{ order.flavor }}</td>
          <td>{{ order.quantity }}</td>
          <td>R$ {{ order.total.toFixed(2) }}</td>
          <td>{{ order.client }}</td>
          <td>
            <input type="checkbox" v-model="order.paid" @change="updateOrder(index, { paid: order.paid })" />
          </td>
          <td>
            <input type="text" v-model="order.notes" @change="updateOrder(index, { notes: order.notes })" />
          </td>
          <td><button @click="deleteOrder(index)">Excluir</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'OrderManager',
  data() {
    return {
      products: [],
      orders: [],
      newOrder: {
        flavor: '',
        quantity: 1,
        client: '',
        paid: false,
        notes: ''
      }
    }
  },
  methods: {
    async fetchProducts() {
      const res = await axios.get('http://localhost:3000/api/products')
      this.products = res.data
    },
    async fetchOrders() {
      const res = await axios.get('http://localhost:3000/api/orders')
      this.orders = res.data
    },
    async addOrder() {
      const product = this.products.find(p => p.name === this.newOrder.flavor)
      const total = product.price * this.newOrder.quantity
      const orderData = { ...this.newOrder, total }
      await axios.post('http://localhost:3000/api/orders', orderData)
      this.newOrder = { flavor: '', quantity: 1, client: '', paid: false, notes: '' }
      this.fetchOrders()
    },
    async updateOrder(index, updatedFields) {
      await axios.put(`http://localhost:3000/api/orders/${index}`, updatedFields)
      this.fetchOrders()
    },
    async deleteOrder(index) {
      await axios.delete(`http://localhost:3000/api/orders/${index}`)
      this.fetchOrders()
    }
  },
  mounted() {
    this.fetchProducts()
    this.fetchOrders()
  }
}
</script>

<style scoped>
.order-manager {
  text-align: center;
  padding: 30px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
}

form {
  margin-bottom: 30px;
}

input,
select {
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
  max-width: 800px;
  margin: 0 auto;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

input[type="checkbox"] {
  transform: scale(1.2);
  cursor: pointer;
}
</style>
