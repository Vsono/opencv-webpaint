<template>
  <div class="container-fluid">
    <div class="row">
      <side-menu></side-menu>
      <view-port></view-port>
    </div>
  </div>
</template>

<script>
import SideMenu from './components/sidemenu.vue'
import ViewPort from './components/viewport.vue'
export default {
  name: 'App',
  components: {
    SideMenu,
    ViewPort
  },
  created(){
    document.addEventListener('contextmenu', event => event.preventDefault());
  },
  unmounted(){

  },
  data(){
    return {
    }
  }
}
</script>

<style scoped>
div{
    padding: 0px;
    margin: 0px;
}
</style>
