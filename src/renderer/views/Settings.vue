<template>
    <div>
        <router-link to="/" >back</router-link>
        settings are here

        <button class="btn btn-warning" @click="destroyDb">Destroy Database</button>
        <!-- napisac jakies ustawienia zapisywane w LocalStorage, np zmiana koloru motywu aplikacji na ciemny itd -->
    </div>
</template>
<script>
import cs from '@/api/CrudService'

export default {
  name: 'Settings',
  methods: {
    destroyDb () {
      cs.destroyDb('charts')
    }
  }
}
</script>