<template>
<div class="viewport col vh-100">
    <canvas id="main-canvas" @mousewheel="zoom" @mousedown="startDrawing" @mouseup="stopDrawing" @mousemove="drag"></canvas>
    <div class="scale-indicator">{{ Math.round(scale * 100) }} %</div>
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
            lastPos: null,
        }
    },
    methods: {
        zoom(e){
            if(this.scale < 0.1 && e.wheelDeltaY < 0 || 
            this.scale > 8 && e.wheelDeltaY > 0)
                return
            this.scale *= (1 + e.wheelDeltaY * 0.0008)
            let cursorPos = this.offsetPosToImgPos(e.offsetX, e.offsetY)
            let oldCenterPos = this.$store.state.viewCenterPos
            if(e.wheelDeltaY > 0)
                this.$store.state.viewCenterPos = new cv.Point(
                    cursorPos.x * 0.1 + oldCenterPos.x * 0.9,
                    cursorPos.y * 0.1 + oldCenterPos.y * 0.9
                )
            else
                this.$store.state.viewCenterPos = new cv.Point(
                    oldCenterPos.x * 1.1 - cursorPos.x * 0.1,
                    oldCenterPos.y * 1.1 - cursorPos.y * 0.1
                )


            this.$store.commit('drawImage')
        },
        startDrawing(e){
            this.drawing = true
            this.lastPos = this.offsetPosToImgPos(e.offsetX, e.offsetY)
        },
        stopDrawing(){
            this.drawing = false
        },
        drag(e){
            if(!this.drawing)
                return
            let newPos = this.offsetPosToImgPos(e.offsetX, e.offsetY)
            
            //HEAVY
            cv.line(this.$store.state.imgmat, this.lastPos, newPos, [0,0,0,255], 3, cv.LINE_AA)
            this.lastPos = newPos
            this.$store.commit('drawImage')
        },
        offsetPosToImgPos(x, y){
            let canvasSize = this.$store.getters.canvasSize
            let centerPos = this.$store.state.viewCenterPos

            return new cv.Point(
                ((x - canvasSize.width / 2) / this.scale) + centerPos.x,
                ((y - canvasSize.height / 2) / this.scale) + centerPos.y
            )
        }
    },
    computed:{
        scale: { 
            get(){
                return this.$store.state.scale
            },
            set(val){
                this.$store.state.scale = val
            }
        }
    }
}
</script>

<style scoped>
.viewport {
    background-color: rgb(54, 54, 54);
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: center;
}

.viewport > * { 
    position: absolute;
}

.scale-indicator {
    color: white;
    background-color: rgba(20, 20, 20, 0.349);
    width: 60px;
    height: 25px;
    bottom: 10px;
    text-align: center;

}

#main-canvas {
    width: 100%;
    /* cursor: url("/cursor.png") 10 10, crosshair; */
    cursor: crosshair;
}
</style>