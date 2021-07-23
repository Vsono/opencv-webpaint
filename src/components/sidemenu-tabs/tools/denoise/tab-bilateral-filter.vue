<template>
    <div class="p-3">
        <label for="">필터 직경</label>
        <input type="range" min="1" max="20" step="1" v-model="diameter" @change="bilateralfilter">
        <input type="number" min="1" max="20" step="1" v-model="diameter" @change="bilateralfilter">
        <label for="">색 공간 시그마 값</label>
        <input type="range" min="1" max="200" step="1" v-model="sigmaColor" @change="bilateralfilter">
        <input type="number" min="1" max="200" step="1" v-model="sigmaColor" @change="bilateralfilter">
        <label for="">좌표 공간 시그마 값</label>
        <input type="range" min="1" max="200" step="1" v-model="sigmaSpace" @change="bilateralfilter">
        <input type="number" min="1" max="200" step="1" v-model="sigmaSpace" @change="bilateralfilter">
    </div>
</template>

<script>
let cv = require('opencv.js');

export default {
    name: 'TabBilateralFilter',
    mounted(){
    },
    props: ['parentsTab'],
    data() {
        return {
            diameter: 5,
            sigmaColor: 75,
            sigmaSpace: 75
        }
    },
    methods: {
        bilateralfilter(){
            this.diameter = parseInt(this.diameter)
            this.sigmaColor = parseInt(this.sigmaColor)
            this.sigmaSpace = parseInt(this.sigmaSpace)

            cv.cvtColor(this.$store.state.viewport.canvas_mat,
            this.$store.state.viewport.overlay_mat,
            cv.COLOR_RGBA2RGB, 0);

            let dst = new cv.Mat()

            cv.bilateralFilter(this.$store.state.viewport.overlay_mat, 
            dst,
            this.diameter, this.sigmaColor, this.sigmaSpace, cv.BORDER_DEFAULT)

            cv.cvtColor(dst,
            this.$store.state.viewport.overlay_mat,
            cv.COLOR_RGB2RGBA, 0);

            this.$store.commit('viewport/renderOverlay')
            this.$emit('filterSelected')

            dst.delete()
            }
    },
    computed: {
    },
    watch: {
        parentsTab(newTab){
            if(newTab == 'bilateral-filter'){
                this.bilateralfilter()
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