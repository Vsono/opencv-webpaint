<template>
<div class="viewport col vh-100">
    <canvas id="main-canvas" @mousewheel="zoom" @mousedown="startDrawing" @mouseup="stopDrawing" @mousemove="drag"></canvas>
</div>
</template>

<script>
let cv = require('opencv.js');
export default {
    name: 'ViewPort',
    mounted() {
        this.$store.state.mainCanvas = document.getElementById('main-canvas')
        window.addEventListener('resize', () => {
            this.$store.commit('fitCanvas')
            this.$store.commit('drawImage')
        })

        this.$store.commit('fitCanvas')
        this.$store.commit('newImage')
        this.$store.commit('resetView')
        this.$store.commit('drawImage')
    },
    beforeUnmount(){
        //window.removeEventListener('resize')
    },
    data(){
        return {
            drawing: false,
            lastPos: new cv.Point(0, 0),
        }
    },
    methods: {
        zoom(e){
            if(this.$store.state.scale > 0.1 || e.wheelDeltaY > 0)
                this.$store.state.scale *= (1 + e.wheelDeltaY * 0.0008)
            this.$store.commit('drawImage')
        },
        startDrawing(e){
            this.drawing = true
            this.lastPos.x = e.offsetX
            this.lastPos.y = e.offsetY
        },
        stopDrawing(){
            this.drawing = false
        },
        drag(e){
            if(!this.drawing)
                return
            console.log(e)
            let newPos = new cv.Point(e.offsetX, e.offsetY)
            
            //HEAVY
            cv.line(this.$store.state.imgmat, this.lastPos, newPos, [0,0,0,255], 3, cv.LINE_AA)
            this.lastPos = newPos
            this.$store.commit('drawImage')
        }
    }
}
</script>

<style scoped>
.viewport {
    background-color: rgb(54, 54, 54);
    width: 100%;
    height: 100%;
}

#main-canvas {
    width: 100%;
    /* cursor: url("/cursor.png") 10 10, crosshair; */
    cursor: crosshair;
}
</style>