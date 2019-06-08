<script>
  import { PolarArea, mixins } from 'vue-chartjs'
  import Printable from '@/mixins/Printable'
  export default {
    extends: PolarArea,
    mixins: [Printable, mixins.reactiveProp],
    props: {
      chartData: {
        type: Object,
        default: null
      },
      options: {
        type: Object,
        default: null
      }
    },
    mounted () {
      this.renderChart(this.chartData, this.options)
    }
  }
</script>
