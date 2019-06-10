<template>
<div class="container py-2">
  <div class="columns">
    <div class="column col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-12 navi"> 
      <router-link to="/" class="btn btn-primary">Wróć</router-link>
    </div>
    
    <div class="column col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-6"> 
      <div v-if="isLoading">Ładowanie ....</div>
      <div v-if="isLoaded">
          <ChartContainer :type="$route.params.type" :data="charts[0].data" :id="charts[0].id" :options="charts[0].options"/>
      </div>
    </div>

    <div class="column col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-6 col-6">
      <div class="btn btn-error" @click='deleteChart'>Usuń wykres</div>
    </div>
  </div>
</div>
</template>
<script>
import cs from '@/api/CrudService'
import router from '@/router/router'
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
      error: ''
    }
  },
  methods: {
    deleteChart () {
      cs.deleteChart(parseInt(this.$route.params.id))
      alert('Pomyślnie usunięto wykres!')
      router.push({ path: '/' })
    },
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
    let prms = new Promise((resolve, reject) => {
      resolve(cs.readChart(parseInt(this.$route.params.id)))
    })
    prms.then((res) => {
      this.charts = res
    }).then(() => {
      this.isLoading = false
      this.isLoaded = true
    })
  }
}
</script>