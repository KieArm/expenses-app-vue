<template>
  <div v-bind:style="{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const props = defineProps({
  income: {
    type: Object,
    required: true
  },
  expenses: {
    type: Object,
    required: true
  }
})
const chartData = computed(() => {
  return {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: [],
        backgroundColor: ['#41B883', '#DD1B16'],
        data: [props.income, Math.abs(props.expenses)]
      }
    ]
  }
})

const chartOptions = computed(() => {
  return {
    responsive: true,
    plugins: {
      legend: {
        display: false
      }
    }
  }
})
</script>
