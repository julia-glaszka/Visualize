<template>
<div class="container view-content">
    <div class="column col-12 section-title">
        <h1 class="text-dark">Twoje Wykresy</h1>
        <p class="text-gray">Zbiór wszystkich dotychczas stworzonych wykresów.</p>
    </div>
    <div v-if="isLoading" class="columns column">loading ....</div>
    <div v-if="isLoaded" class="columns column">
      <router-link to="/aaa"> 404</router-link>
        <div class="grid-layout">
          <div class="grid-item" v-for="(chartx, i) in charts" :key="i">
              <div class="chart-card"> 
                  <router-link :to="`/chart/${chartx.id}/${chartx.type}`"> <ChartContainer :type="chartx.type" :data="chartx.data" :id="chartx.id" :options="chartx.options"/> </router-link>
              </div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import cs from '@/api/CrudService'
import ChartContainer from '@/components/ChartContainer'
export default {
  name: 'Dashboard',
  components: { ChartContainer },
  data () {
    return {
      scheme: [5, 3, 4, 4, 4, 4, 6, 6, 2, 4, 6],
      charts: [],
      read: {},
      isLoading: false,
      isLoaded: false,
      chart: {
        type: 'line',
        data: {
          labels: ['Bulki', 'Chleb', 'Pączki', 'Drożdzówki', 'Ciasto', 'Ciasteczka'],
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
          }
        }
      }
    }
  },
  // methods: {
  //   checkStorage () {
  //     this.charts = idbs.checkStorage('charts')
  //   },
  //   saveToStorage () {
  //     idbs.saveToStorage()
  //   }
  // },
  // computed: {
  //   ...mapState([
  //     'charts'
  //   ])
  // },
  mounted () {
    this.refresh()
  },
  methods: {
    addChart () {
      this.chart.data.datasets[0].data = this.randomData()
      this.chart.data.datasets[0].backgroundColor = this.randomColors()
      this.chart.data.datasets[0].borderColor = this.randomColors()
      cs.addChart(this.chart)
      this.refresh()
    },
    deleteChart () {
      cs.deleteChart(1)
    },
    updateChart () {
      cs.updateChart(3, this.chart)
      console.log('yea')
      this.refresh()
    },
    readChart (id) {
      this.read = cs.readChart(id)
    },
    getAllCharts () {
      cs.getAllCharts()
    },
    refresh () {
      this.isLoading = true
      this.charts = cs.getAllCharts()
      this.isLoading = false
      this.isLoaded = true
    },
    destroyDb () {
      cs.destroyDb('charts')
    },
    randomData () {
      var arr = []
      for (var i = 0; i < 6; i++) {
        arr.push(Math.random(i))
      }
      return arr
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
<style lang="scss" >
  
.grid-layout {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 10px;
    grid-auto-rows: minmax(250px, auto);
    grid-auto-flow: dense;
    padding: 10px;
    width: 100%;
}

.grid-item {
 
    padding: .6rem;
    
    &:nth-child(3n+2) {
      grid-column-end: span 2;
      grid-row-end: span 2;
    }
    &:nth-child(5n+1) {
      grid-column-end: span 1;
      grid-row-end: span 1;
    }
    .chart-card {
      padding: 6px; 
      border-radius: 4px;
       background: #ffffff;
       border: 1px solid rgb(233, 233, 233);
    }
}

</style>
<style lang="scss" scoped>

.view-content {
 
  background: #EFF5F8;

}
.container {
  padding-left: 0;
  padding-right: 0;
  @media screen and (min-width: 50rem) {
    min-height: 90vh;
  }
}
.section-title {
   padding-top: 3rem;
   background: #F3F5F4;
   border-bottom: 1px solid #EDF1F0;
}
</style>
