<template>


<div class="container">
  <!-- To taki generator nowych wykresow, nieskonczony na razie. 
  1. wybierasz typ jaki chcesz (line,bar)
  2. wybierasz baze z dostepnych (na razie nie ma ich)
  3. wybierasz keys po ktorym chcesz pobrac dane i wybierasz co chcesz zrobic z tym np suma, srednia
  4. po wygenerowaniu przekierowuje cie do /chart/:id/:type
   -->



   <button @click="getLastId">get last id </button>
  <div v-if="steps.type" class="columns">
    <router-link to="/">back </router-link>
    <div class="column col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12"><h2>Choose type of chart</h2></div>
    <div class="column col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-6" @click="type='bar'"><img src="static/bar.png" class="img-responsive" alt=""></div>
    <div class="column col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-6" @click="type='line'"><img src="static/line.png" class="img-responsive" alt=""></div>
  
    <button @click="getLastId"> get </button>
    <button @click="steps.type = false; steps.database = true"> next </button>
  </div>
  <div v-else-if="steps.database" class="columns">
   database
  
<button @click="steps.database = false; steps.keys = true">next </button>
  </div>
  <div v-else-if="steps.keys" class="columns">
    keys
  
      <div class="column col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12"><h2>Choose database</h2></div>
<button @click="steps.keys = false; steps.finish = true">next </button>
  </div>
  <div v-else>success!!!!!!!</div>
        <!-- Label: <input type="text" v-model="charts[0].data.datasets.label"> -->
        <!-- <input type="checkbox" name="options" id="" v-model="charts.options.responsive"> responsive
        <input type="checkbox" name="options" id="" v-model="charts.options.maintainAspectRatio"> maintainAspectRatio
        <input type="checkbox" name="options" id="" v-model="charts.options.scales.yAxes[0].ticks"> Begin at zero
        <input type="checkbox" name="options" id="" v-model="charts.options.scales.yAxes[0].legend"> Display Legend   -->
    <button @click="generate">Generate</button>
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
      steps: {
        type: true,
        database: false,
        keys: false,
        finish: true
      },
      loading: false,
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
      newchart: {},
      id: ''
    }
  },
  methods: {
    generate () {
      this.charts.data.datasets[0].data = this.randomData()
      this.charts.data.datasets[0].backgroundColor = this.randomColors()
      this.charts.data.datasets[0].borderColor = this.randomColors()
      console.log(this.charts)
      cs.addChart(this.charts)

      // this.id = cs.getLastId()
      // console.log('getting id' + this.id)
      // var promise1 = new Promise(function(resolve, reject) {
      //   resolve('foo')
      // })
      // promise1.then(function(value) {
      // })
      router.push({name: 'chart', params: {id: this.id[0].id, type: 'line'}})
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