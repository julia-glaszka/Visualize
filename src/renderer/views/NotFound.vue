<template>
    <div>
        <router-link to="/" class="btn btn-primary">Wróć</router-link>
        <h1>

          Error 404. Nie znaleziono strony. :( 

        </h1>
        <ChartContainer :type="chart.type" :data="chart.data" :id="1" :options="chart.options" :key="keyx"/> 
       <sketch-picker v-model="colors" v-if="openModal" @input="generateColor"> </sketch-picker>
       {{activeInput}}
       <div v-for="(dataset, i) in chart.data.datasets">
         <button :style="{background: dataset.backgroundColor[0]}" @click="activeInput = i; openModal = !openModal"></button>
       </div>
       {{color}}
    </div>
</template>

<script>
import ChartContainer from '@/components/ChartContainer'
import { Sketch } from 'vue-color'

export default {
  name: 'NotFound',
  components: {
    ChartContainer,
    'sketch-picker': Sketch
  },
  data () {
    return {
      colors: '',
      color: '',
      keyx: 10,
      openModal: false,
      activeInput: 0,
      chart: {
        type: 'line',
        data: {
          labels: ['Bulki', 'Chleb', 'Pączki', 'Drożdzówki', 'Ciasto', 'Ciasteczka'],
          datasets: [{
            label: '# of Votes',
            data: [{
              x: -2,
              y: 4
            }, {
              x: -1,
              y: 1
            }, {
              x: 0,
              y: 0
            }, {
              x: 1,
              y: 1
            }, {
              x: 2,
              y: 4
            }, {
              x: 2,
              y: 4
            }],
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(154, 162, 235, 0.2)',
              'rgba(55, 206, 84, 0.2)',
              'rgba(175, 192, 192, 0.2)',
              'rgba(53, 22, 25, 0.2)',
              'rgba(55, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(10, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(225, 206, 86, 1)',
              'rgba(75, 142, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 149, 64, 1)'
            ],
            borderWidth: 1
          },
          {
            label: 'mylabel',
            data: [{
              x: -2,
              y: 4
            }, {
              x: 1,
              y: 1
            }, {
              x: 10,
              y: 1
            }, {
              x: 1,
              y: 2
            }, {
              x: 3,
              y: 4
            }, {
              x: 6,
              y: 4
            }],
            backgroundColor: [
              'rgba(255, 99, 132, .3)',
              'rgba(54, 162, 235, .3)',
              'rgba(55, 206, 86, .3)',
              'rgba(75, 192, 192, .3)',
              'rgba(153, 202, 255, .3)',
              'rgba(255, 255, 64, .3)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(55, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 202, 255, 1)',
              'rgba(255, 255, 64, 1)'
            ],
            borderWidth: 1
          },
          {
            label: 'elo',
            data: [{
              x: 1,
              y: 3
            }, {
              x: 1,
              y: 1
            }, {
              x: 6,
              y: 7
            }, {
              x: 5,
              y: 5
            }, {
              x: 3,
              y: 3
            }, {
              x: 1,
              y: 3
            }],
            backgroundColor: [
              'rgba(255, 9, 13, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(55, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(53, 102, 255, 1)',
              'rgba(25, 159, 64, 1)'
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
  methods: {
    generateColor () {
      var color = []
      var colorObj = this.colors.rgba
      Math.decimal = function (n, k) {
        var factor = Math.pow(10, k + 1)
        n = Math.round(Math.round(n * factor) / 10)
        return n / (factor / 10)
      }
      for (var i = 0; i < this.chart.data.datasets[0].data.length; i++) {
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
      console.log('run')
      this.chart.data.datasets[this.activeInput].backgroundColor = color
      this.chart.data.datasets[this.activeInput].borderColor = color
      this.keyx++
    }
  }
}
</script>