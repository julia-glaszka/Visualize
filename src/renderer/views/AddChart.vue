<template>


<div class="container py-2">
  <!-- To taki generator nowych wykresow, nieskonczony na razie. 
  1. wybierasz typ jaki chcesz (line,bar)
  2. wybierasz baze z dostepnych (na razie nie ma ich)
  3. wybierasz keys po ktorym chcesz pobrac dane i wybierasz co chcesz zrobic z tym np suma, srednia
  4. po wygenerowaniu przekierowuje cie do /chart/:id/:type
   -->
  
  <div v-if="steps.type" class="columns">
    
      <div class="column col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12 navi">
        <router-link to="/"><button class="btn btn-primary">Wróć</button> </router-link>
      <button @click="steps.type = false; steps.database = true" class="btn btn-primary"> Dalej </button>
      </div>  
      <div class="column col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12">
          <h2>Wybierz typ wykresu</h2>
      </div>


<div class="column col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-6" v-for="(vtype, i) in types" :key="i" @click="type=vtype.name" :class="{'active': vtype.name == type}">
          <img :src="vtype.image" class="img-responsive" alt="">
      </div>
      <!-- <div class="column col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-6" @click="type='bar'">
          <img src="static/bar.png" class="img-responsive" alt="">
      </div>
      <div class="column col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-6" @click="type='line'">
          <img src="static/line.png" class="img-responsive" alt="">
      </div> -->
      
  </div>
  
  <div v-else-if="steps.database" class="columns">
     <div class="column col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12 navi">
          <button @click="steps.type = true; steps.database = false" class="btn btn-primary"> Cofnij </button>
          <button @click="steps.database = false; steps.keys = true" class="btn btn-primary">Dalej </button>
      </div>
      <div class="column col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12">
          <h2>Wybierz bazę danych</h2>
      </div>
      <div v-for="(database, i) in databases" :key="i" class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-4 database">
        <div class="content">
           {{database.name}}
           {{database.url}}
        </div>
      </div>
     
  </div>
  
  <div v-else-if="steps.keys" class="columns">
     <div class="column col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12 navi">
        <button @click="steps.database = true; steps.keys = false" class="btn btn-primary"> Cofnij </button>
      <button @click="steps.keys = false; steps.customize = true" class="btn btn-primary">Dalej </button>
      </div>
      <div class="column col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12">
          <h2>Wybierz dane, jakie chcesz zwizualizować</h2>
      </div>
      <div class="column col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12">
      jakiesdane
      </div>
     
      
  </div>
 
    <div v-else-if="steps.customize" class="columns">
     <div class="column col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12 navi">
        <button @click="steps.keys = true; steps.customize = false" class="btn btn-primary"> Cofnij </button>
      <button @click="steps.customize = false; steps.finish = true" class="btn btn-primary" :disabled="hasColor ? false : true">Dalej </button>
      </div>
      <div class="column col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12">
          <h2>Spersonalizuj wygląd wykresu</h2>
      </div>
      <div class="column col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12">
        <h2>Schemat kolorów</h2>
       <sketch-picker v-model="colors">  </sketch-picker>
       <swatches-picker v-model="colors">  </swatches-picker>
       
      </div>
      
  </div>
  <div v-else class="columns">
    <div class="column col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12 navi">
        <button @click="steps.success = false; steps.customize = true" class="btn btn-primary"> Cofnij </button>
        <button @click="generate" class="btn btn-primary">Wygeneruj</button>
    </div>
    <div class="column col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12">
      <h2>Sukces! Przejdź do swojego wykresu i zobacz efekt!</h2>
    </div>
  </div>
</div>

</template>
<script>
import { Sketch, Swatches } from 'vue-color'
import cs from '@/api/CrudService'
import da from '@/api/DataAnalyze'
import router from '@/router/router'
export default {
  name: 'AddChart',
  components: {
    'sketch-picker': Sketch,
    'swatches-picker': Swatches
  },
  data () {
    return {
      type: 'line',
      types: [{
        name: 'line',
        image: 'static/line.png'
      },
      {
        name: 'bar',
        image: 'static/bar.png'
      }],
      colors: 0,
      steps: {
        type: true,
        database: false,
        keys: false,
        customize: false,
        finish: false
      },
      databases: [{
        name: 'Populacja światowa',
        url: ''
      },
      {
        name: 'Kurs Bitcoina',
        url: ''
      }],
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
      id: null
    }
  },
  methods: {
    generate () {
      this.charts.data.datasets[0].data = this.randomData()
      this.generateColor()
      console.log(this.charts)
      cs.addChart(this.charts)
      this.gtl().then((id) => {
        router.push({name: 'chart', params: {id: id, type: this.type}})
      }).catch(e => { console.log('error with promise') })
    },
    generateColor () {
      var color = []
      var colorObj = this.colors.rgba
      Math.decimal = function (n, k) {
        var factor = Math.pow(10, k + 1)
        n = Math.round(Math.round(n * factor) / 10)
        return n / (factor / 10)
      }
      for (var i = 0; i < this.charts.data.datasets[0].data.length; i++) {
        let a = Math.random()
        if (a > 1) {
          a = 1
        } else if (a < 0) {
          a = 0
        } else if (!a || isNaN(a)) {
          a = 1
        }
        color.push('rgba(' + colorObj.r + ', ' + colorObj.g + ', ' + colorObj.b + ', ' + Math.decimal(a, 2) + ')')
      }
      this.charts.data.datasets[0].backgroundColor = color
      this.charts.data.datasets[0].borderColor = color
    },
    randomData () {
      var arr = []
      for (var i = 0; i < 6; i++) {
        arr.push(Math.random(i))
      }
      return arr
    },
    analyze () {
      this.summary = da.sum(this.charts.data.datasets[0].data)
      this.average = da.avg(this.charts.data.datasets[0].data)
      this.maximum = da.maxm(this.charts.data.datasets[0].data)
      this.minimum = da.minm(this.charts.data.datasets[0].data)
    },
    gtl () {
      return new Promise((resolve, reject) => {
        const request = window.indexedDB.open('charts', 1)
        request.onsuccess = () => {
          const db = request.result
          const transaction = db.transaction(['charts'], 'readonly')
          const invoiceStore = transaction.objectStore('charts')
          const getCursorRequest = invoiceStore.openCursor(null, 'prev')
          getCursorRequest.onsuccess = e => {
            const cursor = e.target.result
            if (cursor) {
              resolve(cursor.value.id)
            }
          }
        }
      })
    }
    // randomColors () {
    //   var arr = []
    //   for (var i = 0; i < 6; i++) {
    //     var o = Math.round
    //     var r = Math.random
    //     var s = 255
    //     arr.push('rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')')
    //   }
    //   return arr
    // }
  },
  computed: {
    hasColor: function () {
      return this.colors
    }
  }
}
</script>

<style lang="scss">
  .database {
    padding: 0 1rem;
    .content {
      background: pink;
      height: 100%;
    }
  }

.navi {
  justify-content: space-between;
  display: flex;
  .to-right {
    justify-content: end;
  }
}
.active {
  box-shadow: 0 0 10px 0 rgba(230,80,240, .3);
}

</style>