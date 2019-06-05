<script>
import { HorizontalBar, mixins } from 'vue-chartjs'
import Printable from '@/mixins/Printable'
export default {
  extends: HorizontalBar,
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
