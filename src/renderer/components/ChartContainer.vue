<template>
    <div>
        <div v-if="type=='line'">
            <LineChart :chartData="data" :options="options"/>
        </div>
        <div  v-else-if="type=='bar'">
            <BarChart :chartData="data" :options="options"/>
        </div>
        <div v-else> brakuje czegos xd</div>
       
    </div>
</template>
<script>
import LineChart from '@/charts/LineChart.vue'
import BarChart from '@/charts/BarChart.vue'
export default {
  name: 'ChartContainer',
  props: {
    type: {
      type: String,
      required: true
    },
    id: {
      type: Number,
      required: true
    },
    data: {
      type: Object | Array,
      required: true
    },
    options: {
      type: Object | Array,
      required: true
    }
  },
  components: {
    LineChart,
    BarChart
  }

}
</script>