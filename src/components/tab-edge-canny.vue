<template>
    <div class="p-3">
        <label for="">Threshold1</label>
        <input type="range" min="0" max="255" step="1" v-model="threshold1" @change="canny">
        <input type="number" min="0" max="255" step="1" v-model="threshold1" @change="canny">

        <label for="">Threshold2</label>
        <input type="range" min="0" max="255" step="1" v-model="threshold2" @change="canny">
        <input type="number" min="0" max="255" step="1" v-model="threshold2" @change="canny">
    </div>
</template>

<script>
let cv = require('opencv.js');

export default {
    name: 'TabEdgeCanny',
    mounted(){
    },
    props: ['parentsTab'],
    data() {
        return {
            threshold1: 50,
            threshold2: 200
        }
    },
    methods: {
        canny(){
            cv.Canny(this.$store.state.viewport.canvas_mat,
            this.$store.state.viewport.overlay_mat,
            parseInt(this.threshold1), parseInt(this.threshold2))

            cv.cvtColor(this.$store.state.viewport.overlay_mat,
            this.$store.state.viewport.overlay_mat,
            cv.COLOR_GRAY2RGBA)

            this.$store.commit('viewport/renderOverlay')
            this.$emit('filterSelected')
        }
    },
    computed: {
    },
    watch: {
        parentsTab(newTab){
            if(newTab == 'edge-canny'){
                this.canny()
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