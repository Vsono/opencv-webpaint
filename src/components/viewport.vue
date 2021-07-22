<template>
<div class="viewport col vh-100">
    <canvas id="main-canvas" class="h-100"></canvas>
    <canvas id="overlay" class="h-100" @mousewheel="zoom" @mousedown="mdown" @mouseup="mup" @mousemove="mmove"></canvas>
    <div class="scale-indicator">{{ Math.round(scale * 100) }} %</div>
</div>
</template>

<script>
let cv = require('opencv.js');
export default {
    name: 'ViewPort',
    mounted() {
        this.$store.state.viewport.canvas = document.getElementById('main-canvas')
        this.$store.state.viewport.overlay = document.getElementById('overlay')
        window.addEventListener('resize', () => {
            this.$store.commit('viewport/fitView')
            this.$store.commit('viewport/renderCanvas')
        })

        this.$store.commit('viewport/fitView')
        this.$store.commit('viewport/newImage')
        this.$store.commit('viewport/resetView')
        this.$store.commit('viewport/renderCanvas')
    },
    beforeUnmount(){
        //window.removeEventListener('resize')
    },
    data(){
        return {
            startPos: null,
            lastPos: null,
            lbuttondown: false
        }
    },
    methods: {
        zoom(e){
            if(this.scale < 0.1 && e.wheelDeltaY < 0 || 
            this.scale > 8 && e.wheelDeltaY > 0)
                return
            this.scale *= (1 + e.wheelDeltaY * 0.0008)
            let cursorPos = this.offsetPosToImgPos(e.offsetX, e.offsetY)
            let oldCenterPos = this.$store.state.viewport.viewCenterPos
            if(e.wheelDeltaY > 0)
                this.$store.state.viewport.viewCenterPos = new cv.Point(
                    cursorPos.x * 0.1 + oldCenterPos.x * 0.9,
                    cursorPos.y * 0.1 + oldCenterPos.y * 0.9
                )
            else
                this.$store.state.viewport.viewCenterPos = new cv.Point(
                    oldCenterPos.x * 1.1 - cursorPos.x * 0.1,
                    oldCenterPos.y * 1.1 - cursorPos.y * 0.1
                )


            this.$store.commit('viewport/renderCanvas')
            this.$store.commit('viewport/renderOverlay')
        },
        mdown(e){
            if(!this.lbuttondown)
                this.startPos = this.offsetPosToImgPos(e.offsetX, e.offsetY)
            this.lbuttondown = true
            this.lastPos = this.offsetPosToImgPos(e.offsetX, e.offsetY)
        },
        mup(e){
            if(this.lbuttondown) {
                this.lbuttondown = false
                let newPos = this.offsetPosToImgPos(e.offsetX, e.offsetY)
                this.emitter.emit('drag', {start: this.startPos, last: this.lastPos, current: newPos})
            }
        },
        mmove(e){
            if(this.lbuttondown) {
                let newPos = this.offsetPosToImgPos(e.offsetX, e.offsetY)
                this.emitter.emit('drag', {start: this.startPos, last: this.lastPos, current: newPos})
                this.lastPos = newPos
            }
        },
        offsetPosToImgPos(x, y){
            let canvasSize = this.$store.getters['viewport/canvasSize']
            let centerPos = this.$store.state.viewport.viewCenterPos

            return new cv.Point(
                ((x - canvasSize.width / 2) / this.scale) + centerPos.x,
                ((y - canvasSize.height / 2) / this.scale) + centerPos.y
            )
        }
    },
    computed:{
        scale: { 
            get(){
                return this.$store.state.viewport.scale
            },
            set(val){
                this.$store.state.viewport.scale = val
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
}

#overlay {
    width: 100%;
    /* cursor: url("/cursor.png") 10 10, crosshair; */
    cursor: crosshair;
}

</style>