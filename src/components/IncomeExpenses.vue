<template>
  <div class="inc-exp-container">
    <div>
      <h4>Income</h4>
      <p id="money-plus" class="money plus">+£{{ income.toFixed(2) }}</p>
    </div>
    <div>
      <h4>Expense</h4>
      <p id="money-minus" class="money minus">
        -£{{ expenses.toFixed(2).toString().replace('-', '') }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  income: {
    type: Number,
    required: true
  },
  expenses: {
    type: Number,
    required: true
  }
})
</script>
