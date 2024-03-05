<template>
  <AppHeader />
  <div class="container">
    <BalanceView :total="+total" />
    <IncomeExpenses :income="+income" :expenses="+expenses" />
    <BarChart v-if="store.state.chart" :income="+income" :expenses="+expenses" />
    <TransactionList :transactions="transactions" @transactionDeleted="handleTransactionDeleted" />
    <AddTransaction @transactionSubmitted="handleTransactionSubmitted" />
  </div>
  <button class="btn-green" @click="$router.push('/settings')">Settings</button>
  <FooterView />
</template>

<script setup>
import AddTransaction from './AddTransaction.vue'
import AppHeader from './AppHeader.vue'
import BalanceView from './BalanceView.vue'
import IncomeExpenses from './IncomeExpenses.vue'
import BarChart from './BarChart.vue'
import TransactionList from './TransactionList.vue'
import FooterView from './FooterView.vue'

import { useToast } from 'vue-toastification'
import { ref, computed, onMounted } from 'vue'
import { useStore } from '../store/store'
import { v4 as uuidv4 } from 'uuid'

const toast = useToast()
const store = useStore()

// Sample data
const transactions = ref([])

onMounted(() => {
  const savedTransactions = JSON.parse(localStorage.getItem('transactions'))
  if (savedTransactions) {
    transactions.value = savedTransactions
  } else {
    setTimeout(() => {
      toast.success('Welcome, sample data loaded')
    }, 1000)
    transactions.value = [
      { id: 'afca1e40-067d-47f8-afd1-614e1d078738', text: 'Salary', amount: 2680 },
      { id: 'f232414d-053b-40fb-a8ca-1c6dac52db1f', text: 'Mortgage', amount: -1125 },
      { id: '4e6dd687-a954-4203-b303-01cd48f42328', text: 'Food', amount: -420 },
      { id: 'c93a25d1-f85a-4d25-b3ce-515fa3b4d408', text: 'Transport', amount: -150 },
      { id: '02995430-181d-415f-a06c-b89dd7d49154', text: 'Utilities', amount: -350 }
    ]
  }
})

// Totals
const total = computed(() => {
  return transactions.value.reduce((acc, transaction) => {
    return acc + transaction.amount
  }, 0)
})

// Income
const income = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0)
    .toFixed(2)
})

// Expenses
const expenses = computed(() => {
  return transactions.value
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => {
      return acc + transaction.amount
    }, 0)
    .toFixed(2)
})

// Add transaction
const handleTransactionSubmitted = (transactionData) => {
  transactions.value.push({
    id: uuidv4(),
    text: transactionData.text,
    amount: transactionData.amount
  })
  saveTransactionsToLocalStorage()
  toast.success('Transaction added')
}

// Delete transaction
const handleTransactionDeleted = (id) => {
  transactions.value = transactions.value.filter((transaction) => transaction.id !== id)
  saveTransactionsToLocalStorage()
  toast.success('Transaction deleted')
}

// Save to local stoage
const saveTransactionsToLocalStorage = () => {
  localStorage.setItem('transactions', JSON.stringify(transactions.value))
}
</script>
