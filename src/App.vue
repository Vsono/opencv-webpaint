<template>
  <div class="container-fluid">
    <div class="row">
      <side-menu></side-menu>
      <view-port></view-port>
    </div>
  </div>
</template>

<script>
import SideMenu from './components/side-menu.vue'
import ViewPort from './components/view-port.vue'
export default {
  name: 'App',
  components: {
    SideMenu,
    ViewPort
  },
  created(){
    
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
