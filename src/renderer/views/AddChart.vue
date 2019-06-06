<template>


<div class="container">
  <!-- To taki generator nowych wykresow, nieskonczony na razie. 
  1. wybierasz typ jaki chcesz (line,bar)
  2. wybierasz baze z dostepnych (na razie nie ma ich)
  3. wybierasz keys po ktorym chcesz pobrac dane i wybierasz co chcesz zrobic z tym np suma, srednia
  4. po wygenerowaniu przekierowuje cie do /chart/:id/:type
   -->
  TEST: 
  THE LAST ID {{id}}
  THE SUM {{summary}}
  THE AVERAGE {{average}}
  THE MAXIMUM {{maximum}}
  THE MINIMUM {{minimum}}

  <button @click="analyze">analyze </button>
  
  <div v-if="steps.type" class="columns">
      <router-link to="/">back </router-link>
      <div class="column col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12">
          <h2>Choose type of chart</h2>
      </div>
      <div class="column col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-6" @click="type='bar'">
          <img src="static/bar.png" class="img-responsive" alt="">
      </div>
      <div class="column col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-6" @click="type='line'">
          <img src="static/line.png" class="img-responsive" alt="">
      </div>
      <button @click="steps.type = false; steps.database = true"> next </button>
  </div>
  
  <div v-else-if="steps.database" class="columns">
      <div class="column col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12">
          <h2>Choose database</h2>
      </div>
      <div v-for="(database, i) in databases" :key="i" class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-4 database">
        <div class="content">
           {{database.name}}
           {{database.url}}
        </div>
      </div>
      <button @click="steps.type = true; steps.database = false"> back </button>
      <button @click="steps.database = false; steps.keys = true">next </button>
  </div>
  
  <div v-else-if="steps.keys" class="columns">
      <div class="column col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12">
          <h2>Choose Data</h2>
      </div>
      <div class="column col-xs-12">
        <ul>
          <li v-for="(data, i) in samplekeys" :key="i">{{data}}</li>
        </ul>
      </div>
      <div class="column col-xs-12">
        <button @click="steps.database = true; steps.keys = false"> back </button>
      <button @click="steps.keys = false; steps.finish = true">next </button>
      </div>
      
  </div>
  
  <div v-else class="columns">
    <div class="column col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12">
        <button @click="steps.success = false; steps.keys = true"> back </button>
        <h2>success!!!!!!!</h2>
        <button @click="generate">Generate</button>
    </div>
  </div>
</div>

</template>
<script>
import cs from '@/api/CrudService'
import da from '@/api/DataAnalyze'
import router from '@/router/router'
export default {
  name: 'AddChart',
  data () {
    return {
      type: 'line',
      steps: {
        type: true,
        database: false,
        keys: false,
        finish: true
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
      id: null,
      summary: null,
      average: null,
      maximum: null,
      minimum: null,
      samples: [
        {
          '_id': '5cf990793f119ae6e0e7531a',
          'guid': '4fa01a1e-34dd-424b-a0d2-4b3df283f9ed',
          'isActive': true,
          'balance': '$2,032.14',
          'age': 60,
          'eyeColor': 'blue'
        },
        {
          '_id': '5cf99079473d20355072f70b',
          'guid': '11d5d647-408e-4513-9e5b-8d2b83727941',
          'isActive': false,
          'balance': '$1,121.68',
          'age': 56,
          'eyeColor': 'green'
        },
        {
          '_id': '5cf990790aaf5562d4673d93',
          'guid': '47c17261-5adf-4dd0-8f39-9de035a1b560',
          'isActive': true,
          'balance': '$3,217.08',
          'age': 70,
          'eyeColor': 'brown'
        },
        {
          '_id': '5cf990790abf50425a58bdd7',
          'guid': '6862f49f-80cc-4b41-96de-857edb53cf76',
          'isActive': false,
          'balance': '$3,162.11',
          'age': 73,
          'eyeColor': 'green'
        },
        {
          '_id': '5cf99079079cdabd37dd013c',
          'guid': 'f15e4e54-00ff-4fb6-beca-a77ee6585006',
          'isActive': true,
          'balance': '$2,985.17',
          'age': 78,
          'eyeColor': 'brown'
        },
        {
          '_id': '5cf990797ece7f5619e1c3ee',
          'guid': '9dbd4b73-f4b6-4fdd-b35e-f4acac134082',
          'isActive': false,
          'balance': '$2,102.29',
          'age': 52,
          'eyeColor': 'green'
        },
        {
          '_id': '5cf99079a5f0dc897897640a',
          'guid': '0b801f49-fbc8-458d-a2c3-d7738daa2fb9',
          'isActive': false,
          'balance': '$1,813.73',
          'age': 95,
          'eyeColor': 'green'
        }
      ]
    }
  },
  computed: {
    samplekeys: function () {
      return Object.keys(this.samples[0])
    }
  },
  methods: {
    generate () {
      this.charts.data.datasets[0].data = this.randomData()
      this.charts.data.datasets[0].backgroundColor = this.randomColors()
      this.charts.data.datasets[0].borderColor = this.randomColors()
      console.log(this.charts)
      cs.addChart(this.charts)
      this.gtl().then((id) => {
        router.push({name: 'chart', params: {id: id, type: 'line'}})
      }).catch(e => { console.log('error with promise') })
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
    },
    // getLastId () {
    //   const request = window.indexedDB.open('charts', 1)
    //   request.onsuccess = () => {
    //     const db = request.result
    //     const transaction = db.transaction(['charts'], 'readonly')
    //     const invoiceStore = transaction.objectStore('charts')
    //     const getCursorRequest = invoiceStore.openCursor(null, 'prev')
    //     getCursorRequest.onsuccess = e => {
    //       const cursor = e.target.result
    //       if (cursor) {
    //         this.id = cursor.value.id
    //       }
    //     }
    //   }
    // },
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

<style lang="scss">
  .database {
    padding: 0 1rem;
    .content {
      background: pink;
      height: 100%;
    }
  }


</style>