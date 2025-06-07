<template>
  <div class="expense-manager">
    <h2>Gerenciar Despesas</h2>
    <form @submit.prevent="addExpense">
      <input v-model="newExpense.name" placeholder="Nome da despesa" required />
      <input v-model.number="newExpense.quantity" type="number" min="1" placeholder="Quantidade" required />
      <input v-model.number="newExpense.unitPrice" type="number" min="0" step="0.01" placeholder="Valor unitário" required />
      <button type="submit">Adicionar</button>
    </form>

    <table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Valor Total</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(expense, index) in expenses" :key="index">
          <td>{{ expense.name }}</td>
          <td>{{ expense.quantity }}</td>
          <td>R$ {{ expense.unitPrice.toFixed(2) }}</td>
          <td>R$ {{ (expense.quantity * expense.unitPrice).toFixed(2) }}</td>
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
  name: 'ExpenseManager',
  data() {
    return {
      expenses: [],
      newExpense: {
        name: '',
        quantity: 1,
        unitPrice: null
      }
    }
  },
  methods: {
    async fetchExpenses() {
      const res = await axios.get('http://localhost:3000/api/expenses')
      this.expenses = res.data
    },
    async addExpense() {
      await axios.post('http://localhost:3000/api/expenses', this.newExpense)
      this.newExpense = { name: '', quantity: 1, unitPrice: null }
      this.fetchExpenses()
    },
    
    async confirmDelete(index) {
      const result = await Swal.fire({
        title: 'Tem certeza?',
        text: `Deseja excluir "${this.expenses[index].name}"?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#aaa',
        confirmButtonText: 'Sim, excluir!',
        cancelButtonText: 'Cancelar'
      })

      if (result.isConfirmed) {
        await this.deleteExpense(index)
        await Swal.fire({
        title: 'Excluído!',
        text: 'O produto foi excluído com sucesso.',
        icon: 'success',
        timer: 1500,
        showConfirmButton: false,
        willClose: () => {
          this.fetchExpenses()}
        })
      }
    },

    async deleteExpense(index) {
      await axios.delete(`http://localhost:3000/api/expenses/${index}`)
      this.fetchExpenses()
    }
  },
  mounted() {
    this.fetchExpenses()
  }
}
</script>

<style scoped>
.expense-manager {
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
  max-width: 700px;
  margin: 0 auto;
  border-collapse: collapse;
}

th, td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>