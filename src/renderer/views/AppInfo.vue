<template>
    <div>
     

  <transition-group :name="'shuffleMedium'" tag="div" class="deck">
    <div v-for="(type, i) in types" :key="type.id"
         class="type" @click="setFirst(i)">
      <h5>{{type.title}}</h5>
      <img class="image" :src="type.image" :alt="type.title">
    </div>
  </transition-group>
</div>


</template>

<script>
export default {
  name: 'AppInfo',
  data () {
    return {
      types: [{
        id: 0,
        title: 'line',
        image: 'static/line.png'
      },
      {
        id: 1,
        title: 'bar',
        image: 'static/bar.png'
      },
      {
        id: 2,
        title: 'scatter',
        image: 'static/scatter.png'
      },
      {
        id: 3,
        title: 'pie',
        image: 'static/pie.png'
      },
      {
        id: 4,
        title: 'polarArea',
        image: 'static/polarArea.png'
      },
      {
        id: 5,
        title: 'bubble',
        image: 'static/bubble.png'
      },
      {
        id: 6,
        title: 'doughnut',
        image: 'static/doughnut.png'
      }]
    }
  },
  created () {
  },
  methods: {
    setFirst (id) {
      let lea = this.types
      this.types = []
      this.types = lea
      let temp = this.types[0]
      this.types[0] = this.types[id]
      this.types[id] = temp
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
