<template>
    <div class="p-3">
        <label for="">rho</label>
        <input type="range" min="1" max="20" step="1" v-model="rho" @change="houghline">
        <input type="number" min="1" max="20" step="1" v-model="rho" @change="houghline">
        <label for="">theta</label>
        <input type="range" min="0" max="0.035" step="0.001" v-model="theta" @change="houghline">
        <input type="number" min="0" max="0.035" step="0.001" v-model="theta" @change="houghline">
        <label for="">threshold</label>
        <input type="range" min="1" max="200" step="1" v-model="threshold" @change="houghline">
        <input type="number" min="1" max="200" step="1" v-model="threshold" @change="houghline">
    </div>
</template>

<script>
let cv = require('opencv.js');

export default {
    name: 'TabHoughLine',
    mounted(){
    },
    props: ['parentsTab'],
    data() {
        return {
            rho: 1,
            theta: Math.PI / 180,
            threshold: 30
        }
    },
    methods: {
        houghline(){
            this.rho = parseInt(this.rho)
            this.theta = parseFloat(this.theta)
            this.threshold = parseInt(this.threshold)

            let src = this.$store.state.viewport.canvas_mat
            let overlay = this.$store.state.viewport.overlay_mat
            let lines = new cv.Mat();
            let color = new cv.Scalar(0, 255, 0, 255);
            cv.cvtColor(src, overlay, cv.COLOR_RGBA2GRAY, 0);
            cv.Canny(overlay, overlay, 50, 200, 3);
            // You can try more different parameters
            cv.HoughLinesP(overlay, lines, this.rho, this.theta, this.threshold, 0, 0);
            
            cv.cvtColor(overlay, overlay, cv.COLOR_GRAY2RGBA, 0);

            this.$store.commit('viewport/clearOverlay')

            // draw lines
            for (let i = 0; i < lines.rows; ++i) {
                let startPoint = new cv.Point(lines.data32S[i * 4], lines.data32S[i * 4 + 1]);
                let endPoint = new cv.Point(lines.data32S[i * 4 + 2], lines.data32S[i * 4 + 3]);
                cv.line(overlay, startPoint, endPoint, color, 2);
            }
            lines.delete();

            this.$store.commit('viewport/renderOverlay')
            this.$emit('filterSelected')

            }
    },
    computed: {
    },
    watch: {
        parentsTab(newTab){
            if(newTab == 'hough-line'){
                this.houghline()
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