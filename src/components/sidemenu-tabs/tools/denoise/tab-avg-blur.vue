<template>
    <div class="p-3">
        <label for="">커널 크기</label>
        <input type="range" min="1" max="20" step="1" v-model="blocksize" @change="avgblur">
        <input type="number" min="1" max="20" step="1" v-model="blocksize" @change="avgblur">
    </div>
</template>

<script>
let cv = require('opencv.js');

export default {
    name: 'TabAvgBlur',
    mounted(){
    },
    props: ['parentsTab'],
    data() {
        return {
            blocksize: 5,
        }
    },
    methods: {
        avgblur(){
            this.blocksize = parseInt(this.blocksize)
            // cv.cvtColor(this.$store.state.viewport.canvas_mat,
            // this.$store.state.viewport.overlay_mat,
            // cv.COLOR_RGBA2GRAY, 0);

            let kernel = new cv.Mat(this.blocksize, this.blocksize, cv.CV_32F)
            for(let i = 0; i < this.blocksize ** 2; i++){
                kernel.data32F[i] = (1 / (this.blocksize ** 2))
            }

            cv.filter2D(this.$store.state.viewport.canvas_mat, 
            this.$store.state.viewport.overlay_mat,
            cv.CV_8U, kernel)

            kernel.delete()
            
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
            if(newTab == 'avg-blur'){
                this.avgblur()
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