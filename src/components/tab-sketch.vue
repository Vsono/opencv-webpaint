<template>
    <div class="p-3">
        <input type="color" value="#000" @change="watchColorPicker">
    </div>
</template>

<script>
let cv = require('opencv.js');
export default {
    name: 'TabSketch',
    mounted() {
        this.$store.state.currentTool = 'sketch'
        this.emitter.on('drag', (args) => {
            cv.line(this.$store.state.viewport.imgmat, args[0], args[1], this.color, 3, cv.LINE_AA)
            this.$store.commit('viewport/drawImage')
        })
    },
    unmounted(){
        this.emitter.off('drag')
    },
    data() { 
        return {
            color: [0, 0, 0, 255]
        }
    },
    methods: {
        watchColorPicker(e) {
            let i = parseInt(e.target.value.substr(1), 16)
            this.color = [
                Math.round(i / (256 * 256)),
                Math.round((i % (256 * 256)) / 256),
                Math.round(i % (256)),
                255
            ]
        }
    }
}
</script>

<style scoped>
input[type='color'] {
    padding: 2px;
    height: 20px;
}

label{
    vertical-align: middle;
    font-size: 20px;
}
</style>