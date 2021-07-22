<template>
    <div class="p-3">
        <label for="">ksize</label>
        <input type="range" min="1" max="5" step="1" v-model="ksize" @change="laplacian">
        <input type="number" min="1" max="5" step="1" v-model="ksize" @change="laplacian">

        <label for="">scale</label>
        <input type="range" min="1" max="100" step="1" v-model="scale" @change="laplacian">
        <input type="number" min="1" max="100" step="1" v-model="scale" @change="laplacian">
        
        <label for="">delta</label>
        <input type="range" min="0" max="100" step="1" v-model="delta" @change="laplacian">
        <input type="number" min="0" max="100" step="1" v-model="delta" @change="laplacian">
    </div>
</template>

<script>
let cv = require('opencv.js');

export default {
    name: 'TabEdgeLaplacian',
    mounted(){
    },
    props: ['parentsTab'],
    data() {
        return {
            ksize: 1,
            scale: 1,
            delta: 0
        }
    },
    methods: {
        laplacian(){
            cv.cvtColor(this.$store.state.viewport.canvas_mat,
            this.$store.state.viewport.overlay_mat,
            cv.COLOR_RGBA2GRAY, 0);
            
            cv.Laplacian(this.$store.state.viewport.overlay_mat,
            this.$store.state.viewport.overlay_mat,
            cv.CV_8U, parseInt(this.ksize), parseInt(this.scale), parseInt(this.delta), cv.BORDER_DEFAULT)
            
            cv.cvtColor(this.$store.state.viewport.overlay_mat,
            this.$store.state.viewport.overlay_mat,
            cv.COLOR_GRAY2RGBA, 0);


            this.$store.commit('viewport/renderOverlay')
            this.$emit('filterSelected')

        }
    },
    computed: {
    },
    watch: {
        parentsTab(newTab){
            if(newTab == 'edge-laplacian'){
                console.log('edge-diff')
                this.laplacian()
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