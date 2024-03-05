import type { InjectionKey } from 'vue'
import { createStore, useStore as baseUseStore, Store } from 'vuex'

export interface State {
  chart: boolean
}

export const key: InjectionKey<Store<State>> = Symbol()

const chartToggle = JSON.parse(localStorage.getItem('chart') || '""')

export const store = createStore<State>({
  state: {
    chart: chartToggle === false ? false : true
  },
  mutations: {
    toggleChart(state) {
      localStorage.setItem('chart', JSON.stringify(!state.chart))
      state.chart = !state.chart
    }
  }
})

export function useStore() {
  return baseUseStore(key)
}
