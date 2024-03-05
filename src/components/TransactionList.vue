<template>
  <h3>History</h3>
  <ul id="list" class="list">
    <li
      v-for="transaction in transactions"
      v-bind:key="transaction.id"
      v-bind:class="transaction.amount < 0 ? 'minus' : 'plus'"
    >
      {{ transaction.text }}
      <span
        >{{ transaction.amount < 0 ? '-' : '+' }}£{{
          transaction.amount.toString().replace('-', '')
        }}</span
      ><button @click="deleteTransaction(transaction.id)" class="delete-btn">x</button>
    </li>
  </ul>
</template>

<script setup>
const emit = defineEmits(['transactionDeleted'])
defineProps({
  transactions: {
    type: Array,
    required: true
  }
})

const deleteTransaction = (id) => {
  emit('transactionDeleted', id)
}
</script>
