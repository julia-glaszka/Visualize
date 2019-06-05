<template>
    <div>
          <router-link to="/">back </router-link>
     <div>
        <select name="type" v-model="type">
          <option disabled value="">Select Type</option>
          <option value="line">line</option>
          <option value="bar">bar</option>
        </select> 
        <!-- Label: <input type="text" v-model="charts[0].data.datasets.label"> -->
        <!-- <input type="checkbox" name="options" id="" v-model="charts.options.responsive"> responsive
        <input type="checkbox" name="options" id="" v-model="charts.options.maintainAspectRatio"> maintainAspectRatio
        <input type="checkbox" name="options" id="" v-model="charts.options.scales.yAxes[0].ticks"> Begin at zero
        <input type="checkbox" name="options" id="" v-model="charts.options.scales.yAxes[0].legend"> Display Legend   -->
        <button @click="generate">Generate</button>
    </div>
    </div>
</template>
<script>
import cs from '@/api/CrudService'
import router from '@/router/router'
export default {
  name: 'AddChart',
  data () {
    return {
      type: '',
      id: '',
      charts: {
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          },
          onClick: this.handle
        }
      },
      newchart: {}
    }
  },
  methods: {
    generate () {
      this.charts.data.datasets[0].data = this.randomData()
      this.charts.data.datasets[0].backgroundColor = this.randomColors()
      this.charts.data.datasets[0].borderColor = this.randomColors()
      cs.addChart(this.charts)
      router.push({name: 'chart', params: { id: 19 }})
    },
    randomData () {
      var arr = []
      for (var i = 0; i < 6; i++) {
        arr.push(Math.random(i))
      }
      return arr
    },
    getLastId () {
      console.log(cs.getLastId())
    },
    randomColors () {
      var arr = []
      for (var i = 0; i < 6; i++) {
        var o = Math.round
        var r = Math.random
        var s = 255
        arr.push('rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')')
      }
      return arr
    }
  }
}
</script>