<template>
<div class="container view-content">
  
      <div class="column col-12 section-title">
        <h1 class="text-dark">Twoje Wykresy</h1>
        <p class="text-gray">Zbiór wszystkich dotychczas stworzonych wykresów.</p>
      
      </div>
    <div v-if="isLoading" class="columns column">loading ....</div>
    
    <div v-if="isLoaded" class="columns column">
      
        <!-- jest takie cos jak vuedevtools w tym okienku co ci sie wyswietla, 
        odpalasz zwykle devtoolsy jesli sie same nie wlaczyly (ctrl + shift + i) 
        masz takie zakladki jak elements, console itd i znalezc trzeba "vue" , 
        tam sie wszystko pokazuje jak wygladaja dane aktualnie -->

        <!-- zeby zobaczyc baze danych aplikacji to tez devtoolsy 
        ale zakladka application -> indexeddb ->nazwa  -->
        <!--
          TU JEST TROCHE PRZYKLADOW JAK WYWOLYWAC FUNKCJE ITD, ODKOMENTUJ I ZOBACZ JAK DZIALA
           <router-link to="/add">add new chart</router-link> -->

  <!-- <router-link to="/chart/1/line">chartDetails 1 </router-link>
  <router-link to="/chart/3/bar">chartDetails 3</router-link>
  <router-link to="/chart/4/line">chartDetails 4</router-link>
  <router-link to="/chart/18/bar">chartDetails 18</router-link> -->

    
    <!-- <button @click="readChart(3)" class="btn btn-primary">readChart(3)</button> <br>
    <button @click="updateChart()" class="btn btn-primary">updateChart()</button>  <br>
readed: {{JSON.stringify(read)}} <br/>
 <button @click="getAllCharts()" class="btn btn-primary">getAllCharts()</button><br>
 -->

 <!-- <button @click="destroyDb()" class="btn btn-primary">destroyDb()</button><br>
 <button @click="readChart(1)" class="btn btn-primary">readChart(1)</button><br>
 <button @click="deleteChart(2)" class="btn btn-primary">deleteChart(2)</button><br>  -->
    
      <div class="grid-layout">
        <div class="grid-item" v-for="(chartx, i) in charts" :key="i">
 <div class="chart-card"> 
      <!-- <button @click="deleteChart(i)">delete chart {{i}}</button> -->
      <router-link :to="`/chart/${chartx.id}/${chartx.type}`"> <ChartContainer :type="chartx.type" :data="chartx.data" :id="chartx.id" :options="chartx.options"/> </router-link>
    </div>
        </div>
 
      </div>
  

<!-- :class="`column col-xs-12 col-sm-12 col-md-12 col-lg-${scheme[i%scheme.length]} col-xl-${scheme[i%scheme.length]} col-${scheme[i%scheme.length]}`" -->
    
    </div>

  </div>
  
</template>

<script>
import cs from '@/api/CrudService'
import da from '@/api/DataAnalyze'
// import idbs from '@/api/indexedDBService.js'
// import { mapState, mapActions } from 'vuex'
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
          },
          onClick: this.handle
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
    getData () {
      da.getData()
    },
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
  // methods: {
  //   ...mapActions([
  //     'checkStorage',
  //     'destroyDb',
  //     'deleteChart'
  //   ])
  // }
}
</script>
<style lang="scss" >
  
.grid-layout {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-gap: 10px;
    grid-auto-rows: minmax(180px, auto);
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
}
.section-title {
   padding-top: 3rem;
   background: #F3F5F4;
   border-bottom: 1px solid #EDF1F0;
}
</style>
