<template>
    <div class="columns">
      <div class="column col-xs-12">
         <router-link to="/" >Wróć</router-link>
        <h3>Ustawienia Aplikacji</h3>

        <button class="btn btn-warning" @click="destroyDb">Usuń bazę danych</button>
      </div>
       
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