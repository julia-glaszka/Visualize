<template>
    <div>
     <h1>add labels</h1>
    <input type="text" v-model="tempLabel"> <button @click="addLabel(tempLabel)">add</button>
    <h3>labels:</h3>
    <div v-for="(label, i) in labels" :key="i">
      {{i}} . {{label}} <button @click="removeLabel(i)">X</button>
    </div>


    <h3>add dataset</h3>
    <input type="text" v-model="datasetName"> <button @click="addDataset(datasetName)">add</button>
    <div v-for="(dataset, j) in datasets">
      {{j}} . {{dataset.label}}
       <input type="number" v-model="val"> <button @click="addDataToDataset(j, val)">+</button> 
        <div v-for="(data, k) in dataset.data"> {{data}} <button @click="removeDataFromDataset(j, k)">-</button> </div>
      </div>
<br>
<br>
datasets:
<br>
     {{datasets}}

     <br>
<br>
labels:
<br>
     {{labels}}
   

       <button @click="setChart">set chart</button>
chart : <br><br>

       {{chart}}

       <button @click="showChart=!showChart"> show chart</button>
      <div v-if="showChart" > 
          <ChartContainer :type="chart.type" :data="chart.data" :id="0" :options="chart.options"/> 

      </div>
      
   </div>

</template>

<script>
import ChartContainer from '@/components/ChartContainer'
export default {
  name: 'AppInfo',
  components: {
    ChartContainer
  },
  data () {
    return {
      showChart: false,
      datasets: [],
      tempLabel: '',
      labels: [],
      datasetName: '',
      datasetData: [],
      val: 0,
      chart: {
        type: 'line',
        data: {
          labels: [],
          datasets: [{
            label: '',
            data: [],
            backgroundColor: [],
            borderColor: [],
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
  created () {
  },
  methods: {
    addLabel (label) {
      this.labels.push(label)
      this.tempLabel = ''
    },
    removeLabel (index) {
      this.labels.splice(index, 1)
    },
    addDataset (dn) {
      var myDataset = {}
      myDataset.label = dn
      myDataset.data = []
      myDataset.backgroundColor = [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ]
      myDataset.borderColor = [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ]
      myDataset.borderWidth = 1
      this.datasets.push(myDataset)
      this.datasetName = ''
    },
    addDataToDataset (datasetId, data) {
      this.datasets[datasetId].data.push(data)
    },
    removeDataFromDataset (datasetId, dataId) {
      this.datasets[datasetId].data.splice(dataId, 1)
    },
    setChart () {
      this.chart.data.labels = this.labels
      this.chart.data.datasets = this.datasets
    }
  }
}
</script>

<style lang="scss">

.main-buttons {
  display: block;
  margin: 0 auto;
  text-align: center;
  padding-top: 30px;
  margin-bottom: 0 !important;
}


.deck {
  margin-left: 30px;
  padding-top: 30px;
}

.type {
  width: 25%;
  float: left;
  border-radius: 2px;
  transition: 1s ease;
  padding: .5rem .3rem;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: white;
  flex-direction: column;
  &:first-of-type {
    width: 50%;
    padding: 15px 25px;
    display: flex;
    justify-content: center;
    
    .image {
      box-shadow: 8px 5px 30px 0 rgba(150, 150, 150, 0.24);
      border-radius: 10px;
      padding: 20px 5px;
    }
  }
  .image {
    max-height: 100%;
    max-width: 100%;
    
    width: auto;
  }
 
}

.shuffleMedium-move {
  transition: width .5s, height .5s, transform .5s;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
.fade-enter-to, .fade-leave {
  width: 100%;
 height: 300px;
}

</style>
