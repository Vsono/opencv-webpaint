<template>
    <div class="p-3">
        <label for="">Blocksize</label>
        <input type="range" min="1" max="20" step="1" v-model="blocksize" @change="harris">
        <input type="number" min="1" max="20" step="1" v-model="blocksize" @change="harris">

        <label for="">ksize</label>
        <input type="range" min="1" max="5" step="1" v-model="ksize" @change="harris">
        <input type="number" min="1" max="5" step="1" v-model="ksize" @change="harris">
    </div>
</template>

<script>
let cv = require('opencv.js');

export default {
    name: 'TabHarris',
    mounted(){
    },
    props: ['parentsTab'],
    data() {
        return {
            blocksize: 5,
            ksize: 3
        }
    },
    methods: {
        harris(){
            cv.cvtColor(this.$store.state.viewport.canvas_mat,
            this.$store.state.viewport.overlay_mat,
            cv.COLOR_RGBA2GRAY, 0);
            
            cv.cornerHarris(this.$store.state.viewport.overlay_mat,
            this.$store.state.viewport.overlay_mat,
            parseInt(this.blocksize), parseInt(this.ksize), 0.04, cv.BORDER_DEFAULT)
            
            // cv.cvtColor(this.$store.state.viewport.overlay_mat,
            // this.$store.state.viewport.overlay_mat,
            // cv.COLOR_GRAY2RGBA, 0);


            this.$store.commit('viewport/renderOverlay')
            this.$emit('filterSelected')
            }
    },
    computed: {
    },
    watch: {
        parentsTab(newTab){
            if(newTab == 'harris'){
                this.harris()
            }
        }
    }
}
</script>

<style scoped>
input[type="number"] {
    margin-bottom: 20px;
}
</style>