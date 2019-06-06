<template>
<div class="container">
  <div class="columns">
      
    <div v-if="isLoading" class="column">loading ....</div>
    
    <div v-if="isLoaded" class="columns column">
      <div class="column col-12">

        <!-- jest takie cos jak vuedevtools w tym okienku co ci sie wyswietla, 
        odpalasz zwykle devtoolsy jesli sie same nie wlaczyly (ctrl + shift + i) 
        masz takie zakladki jak elements, console itd i znalezc trzeba "vue" , 
        tam sie wszystko pokazuje jak wygladaja dane aktualnie -->

        <!-- zeby zobaczyc baze danych aplikacji to tez devtoolsy 
        ale zakladka application -> indexeddb ->nazwa  -->
        <!--
          TU JEST TROCHE PRZYKLADOW JAK WYWOLYWAC FUNKCJE ITD, ODKOMENTUJ I ZOBACZ JAK DZIALA
           <router-link to="/add">add new chart</router-link> -->
  <br>
  <!-- <router-link to="/chart/1/line">chartDetails 1 </router-link>
  <router-link to="/chart/3/bar">chartDetails 3</router-link>
  <router-link to="/chart/4/line">chartDetails 4</router-link>
  <router-link to="/chart/18/bar">chartDetails 18</router-link> -->

    
    <!-- <button @click="readChart(3)" class="btn btn-primary">readChart(3)</button> <br>
    <button @click="updateChart()" class="btn btn-primary">updateChart()</button>  <br>
readed: {{JSON.stringify(read)}} <br/>
 <button @click="getAllCharts()" class="btn btn-primary">getAllCharts()</button><br>
 -->
  <button @click="addChart()" class="btn btn-primary">wygeneruj nowy wykres addChart() [doda sie na dole]</button><br> 
    <button @click="getData" class="btn btn-primary">getdata</button><br> 

 <!-- <button @click="destroyDb()" class="btn btn-primary">destroyDb()</button><br>
 <button @click="readChart(1)" class="btn btn-primary">readChart(1)</button><br>
 <button @click="deleteChart(2)" class="btn btn-primary">deleteChart(2)</button><br>  -->
      </div>
    <div  v-for="(chartx, i) in charts" :key="i" class="column col-xs-12 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-6"> 
      <!-- <button @click="deleteChart(i)">delete chart {{i}}</button> -->
      <ChartContainer :type="types[i%2]" :data="chartx.data" :id="chartx.id" :options="chartx.options"/>
      <router-link :to="`/chart/${chartx.id}/${types[i%2]}`"> <button class="btn btn-primary">Go to chart no. {{chartx.id}} </button> </router-link>
    </div>
    </div>

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
      charts: [],
      read: {},
      types: ['line', 'bar'],
      isLoading: false,
      isLoaded: false,
      chart: {
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
