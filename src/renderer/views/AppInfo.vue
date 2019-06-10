<template>
    <div>
      <iframe src="https://evilghostgirl.github.io/visualize-project/" class="iframe-ws">
	<a href="https://evilghostgirl.github.io/visualize-project/">Przejdź do www</a>
</iframe>
   </div>

</template>

<script>
export default {
  name: 'AppInfo'
}
</script>

<style lang="scss">
.iframe-ws {
  width: 100%;
  height: 90vh;
}

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
