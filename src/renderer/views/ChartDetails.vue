<template>
  <div>
    <router-link to="/">back</router-link>
    {{ $route.params.id }}
    {{ $route.params.type }}
    <div v-if="isLoading">Loading ....</div>
    
    <div v-if="isLoaded">
      {{JSON.stringify(charts)}}
      chartid {{charts.id}}
      <ChartContainer :type="$route.params.type" :data="charts[0].data" :id="charts[0].id" :options="charts[0].options"/>
      <div>
        <select name="type" v-model="type">
          <option disabled value="">Select Type</option>
          <option value="line">line</option>
          <option value="bar">bar</option>
        </select> 
        Label: <input type="text" v-model="charts[0].data.datasets[0].label">
        Url of database: <input type="url" v-model="db">
        <input type="checkbox" name="options" id="" v-model="charts[0].options.responsive"> responsive
        <input type="checkbox" name="options" id="" v-model="charts[0].options.maintainAspectRatio"> maintainAspectRatio
        <input type="checkbox" name="options" id="" v-model="charts[0].options.scales.yAxes[0].ticks"> Begin at zero
        <input type="checkbox" name="options" id="" v-model="charts[0].options.scales.yAxes[0].legend"> Display Legend 
        backgroundColor :
       <input type="color" name="background" id="" v-model="charts[0].data.datasets[0].backgroundColor[selectedData.index]">      
        borderColor :
        <input type="color" name="border" id="" v-model="charts[0].data.datasets[0].borderColor[selectedData.index]">  
        <input type="button" value="" @click="reset"> 
    </div>

      </div>
   

    </div>
</template>
<script>
import cs from '@/api/CrudService'
import ChartContainer from '@/components/ChartContainer'
export default {
  name: 'ChartDetails',
  components: {
    ChartContainer
  },
  data () {
    return {
      firstPoint: '',
      isLoading: 0,
      isLoaded: 0,
      type: 'line',
      db: '',
      label: '',
      selectedData: {
        index: 1
      },
      charts: {},
      value: '',
      error: 0
    }
  },
  methods: {
    handle (point, event) {
      // handle clicked point on chart
      if (!event[0]._index) {
        this.selectedData = {}
      } else {
        const item = event[0]
        this.selectedData = {
          index: item._index
        }
      }
    },
    reset () {
      // nothing
    }
  },
  mounted () {
    this.isLoading = true
    this.charts = cs.readChart(parseInt(this.$route.params.id))
    this.isLoading = false
    this.isLoaded = true
    // this.$EventBus.$on('update-options', (payload) => {
    //   this.chart.options = payload
    // })
  }
}
</script>