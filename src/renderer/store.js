// import Vue from 'vue'
// import Vuex from 'vuex'

// import ls from './api/localStorageService'
// import idbs from './api/indexedDBService'

// Vue.use(Vuex)

// export default new Vuex.Store({
//   state: {
//     charts: [],
//     dataFields: ['charts']
//   },
//   mutations: {
//     setState (state, { field, data }) {
//       Vue.set(state, field, data)
//     },
//     addChart (state, newChart) {
//       state.charts.push(newChart)
//     },
//     deleteChart (state, { chartIndex }) {
//       state.charts.splice(chartIndex, 1)
//     }
//   },
//   actions: {
//     addChart ({ commit, dispatch }, newChart) {
//       commit('addChart', newChart)
//       dispatch('saveCharts')
//     },
//     deleteChart ({ commit, dispatch }, chartIndex) {
//       commit('deleteChart', chartIndex)
//       dispatch('saveCharts')
//     },
//     putChart ({state}, id) {
//       try {
//         idbs.saveToStorage('chart', state.charts[id])
//       } catch (e) {
//         console.log('chuj')
//       }
//     },
//     checkStorage ({ state, commit }) {
//       state.dataFields.forEach(async field => {
//         try {
//           let data = await idbs.checkStorage(field)
//           console.log('zyje')
//           if (data === undefined) {
//             data = ls.checkStorage(field)
//             console.log('data undef')
//             console.log(JSON.stringify(data))
//           }
//           if (data === null) {
//             data = []
//             console.log('data null')
//             console.log(JSON.stringify(data))
//           }
//           commit('setState', { field, data })
//         } catch (e) {
//           commit('setState', { field, data: [] })
//         }
//       })
//     },
//     destroyDb ({ state, commit }, field) {
//       try {
//         if (idbs.destroyDb(field)) {
//           console.log('rozjebane')
//         }
//         commit('setState', { field, data: [] })
//       } catch (e) {
//         console.log(e)
//       }
//     },
//     async saveCharts ({ state }) {
//       try {
//         state.dataFields.forEach(field => idbs.saveToStorage(field, state[field]))
//       } catch (e) {
//         state.dataFields.forEach(field => ls.saveToStorage(field, state[field]))
//       }
//     }
//   },
//   getters: {
//     getChartById: state => id => {
//       return state.charts.find(chart => chart.id === id)
//     }
//   }
// })
