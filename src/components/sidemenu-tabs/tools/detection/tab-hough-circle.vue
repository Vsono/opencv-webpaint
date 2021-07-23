<template>
    <div class="p-3">
        <label for="">dp</label>
        <input type="range" min="1" max="10" step="0.1" v-model="dp" @change="houghcircle">
        <input type="number" min="1" max="10" step="0.1" v-model="dp" @change="houghcircle">
        
        <label for="">minDist</label>
        <input type="range" min="1" max="100" step="1" v-model="minDist" @change="houghcircle">
        <input type="number" min="1" max="100" step="1" v-model="minDist" @change="houghcircle">

        <label for="">param1</label>
        <input type="range" min="1" max="100" step="1" v-model="param1" @change="houghcircle">
        <input type="number" min="1" max="100" step="1" v-model="param1" @change="houghcircle">

        <label for="">param2</label>
        <input type="range" min="1" max="100" step="1" v-model="param2" @change="houghcircle">
        <input type="number" min="1" max="100" step="1" v-model="param2" @change="houghcircle">

        <label for="">minRadius</label>
        <input type="range" min="1" max="500" step="1" v-model="minRadius" @change="houghcircle">
        <input type="number" min="1" max="500" step="1" v-model="minRadius" @change="houghcircle">

        <label for="">maxRadius</label>
        <input type="range" min="1" max="500" step="1" v-model="maxRadius" @change="houghcircle">
        <input type="number" min="1" max="500" step="1" v-model="maxRadius" @change="houghcircle">

    </div>
</template>

<script>
let cv = require('opencv.js');

export default {
    name: 'TabHoughCircle',
    mounted(){
    },
    props: ['parentsTab'],
    data() {
        return {
            dp: 1,
            minDist: 45,
            param1: 75,
            param2: 40,
            minRadius: 0,
            maxRadius: 70
        }
    },
    methods: {
        houghcircle(){
            this.dp = parseFloat(this.dp)
            this.minDist = parseInt(this.minDist)
            this.param1 = parseInt(this.param1)
            this.param2 = parseInt(this.param2)
            this.minRadius = parseInt(this.minRadius)
            this.maxRadius = parseInt(this.maxRadius)

            let src = this.$store.state.viewport.canvas_mat
            let overlay = this.$store.state.viewport.overlay_mat
            let circles = new cv.Mat();
            let color = new cv.Scalar(0, 255, 0, 255);
            cv.cvtColor(src, overlay, cv.COLOR_RGBA2GRAY, 0);
            // You can try more different parameters
            cv.HoughCircles(overlay, circles, cv.HOUGH_GRADIENT,
                this.dp, this.minDist, this.param1, this.param2, this.minRadius, this.maxRadius);
                            
            cv.cvtColor(overlay, overlay, cv.COLOR_GRAY2RGBA, 0);

            this.$store.commit('viewport/clearOverlay')
            // draw circles
            for (let i = 0; i < circles.cols; ++i) {
                let x = circles.data32F[i * 3];
                let y = circles.data32F[i * 3 + 1];
                let radius = circles.data32F[i * 3 + 2];
                let center = new cv.Point(x, y);
                cv.circle(overlay, center, radius, color, 2);
            }
            circles.delete();

            this.$store.commit('viewport/renderOverlay')
            this.$emit('filterSelected')
            }
    },
    computed: {
    },
    watch: {
        parentsTab(newTab){
            if(newTab == 'hough-circle'){
                this.houghcircle()
            }
        }
    }
}
</script>

<style scoped>
input[type="number"] {
    margin-bottom: 20px;
    width: 20%;
}
input[type="range"] {
    margin-bottom: 20px;
    width: 80%;
}
</style>