<template>
  <h3>Add new transaction</h3>
  <form id="form" @submit.prevent="onSubmit">
    <div class="form-control">
      <label for="text">Name:</label>
      <input type="text" id="text" v-model="text" />
    </div>
    <div class="form-control">
      <label for="amount">Amount:</label>
      <input type="number" id="amount" v-model="amount" placeholder="0" />
    </div>
    <button class="btn">Add transaction</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useToast } from 'vue-toastification'

const text = ref('')
const amount = ref(0)

const emit = defineEmits(['transactionSubmitted'])
const toast = useToast()

const onSubmit = () => {
  if (!text.value) {
    toast.error('Please enter a name')
    return
  }

  if (!amount.value) {
    toast.error('Please enter an amount')
    return
  }

  const transactionData = {
    text: text.value,
    amount: amount.value
  }

  emit('transactionSubmitted', transactionData)

  text.value = ''
  amount.value = 0
}
</script>
