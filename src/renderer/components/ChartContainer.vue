<template>
    <div>
        <div v-if="type=='line'">
            <LineChart :chartData="data" :options="options"/>
        </div>
        <div  v-else-if="type=='bar'">
            <BarChart :chartData="data" :options="options"/>
        </div>

  <div  v-else-if="type=='bubble'">
            <BubbleChart :chartData="data" :options="options"/>
        </div>
          <div  v-else-if="type=='doughnut'">
            <DoughnutChart :chartData="data" :options="options"/>
        </div>
          <div  v-else-if="type=='pie'">
            <PieChart :chartData="data" :options="options"/>
        </div>
          <div  v-else-if="type=='polarArea'">
            <PolarAreaChart :chartData="data" :options="options"/>
        </div>
          <div  v-else-if="type=='scatter'">
            <ScatterChart :chartData="data" :options="options"/>
        </div>        <div v-else> Wystąpił problem przy generowaniu wykresu. Spróbuj ponownie. </div>
       
    </div>
</template>
<script>
import LineChart from '@/charts/LineChart.vue'
import BarChart from '@/charts/BarChart.vue'
import BubbleChart from '@/charts/BubbleChart.vue'
import DoughnutChart from '@/charts/DoughnutChart.vue'
import PieChart from '@/charts/PieChart.vue'
import PolarAreaChart from '@/charts/PolarAreaChart.vue'
import ScatterChart from '@/charts/ScatterChart.vue'
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
    BarChart,
    BubbleChart,
    DoughnutChart,
    PieChart,
    PolarAreaChart,
    ScatterChart
  }

}
</script>