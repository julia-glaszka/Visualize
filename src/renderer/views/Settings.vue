<template>
<div class="container py-2">
  <div class="columns">
      <div class="column col-xs-12 ">
        <router-link to="/" class="btn btn-primary">Wróć</router-link>
        <br>
        <br>
        <h2>Ustawienia Aplikacji</h2>
        <br>
        <br>
        <button class="btn btn-warning" @click="destroyDb">Usuń bazę danych</button>
      </div>       
    </div>
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