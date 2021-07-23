<template>
    <div class="p-3">
        <label for="">커널 크기</label>
        <input type="range" min="1" max="101" step="2" v-model="ksize" @change="gaussianblur">
        <input type="number" min="1" max="101" step="2" v-model="ksize" @change="gaussianblur">
    </div>
</template>

<script>
let cv = require('opencv.js');

export default {
    name: 'TabGaussianBlur',
    mounted(){
    },
    props: ['parentsTab'],
    data() {
        return {
            ksize: 5,
        }
    },
    methods: {
        gaussianblur(){
            this.ksize = parseInt(this.ksize)

            let ksizeparam = new cv.Size(this.ksize, this.ksize)

            cv.GaussianBlur(this.$store.state.viewport.canvas_mat, 
            this.$store.state.viewport.overlay_mat,
            ksizeparam, 0, 0)


            this.$store.commit('viewport/renderOverlay')
            this.$emit('filterSelected')
            }
    },
    computed: {
    },
    watch: {
        parentsTab(newTab){
            if(newTab == 'gaussian-blur'){
                this.gaussianblur()
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