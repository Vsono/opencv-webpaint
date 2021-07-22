<template>
    <div class="p-3">
        <label for="">색상: 
            <input type="color" value="#000" @change="watchColorPicker">
            </label>
        <label for="">두께: 
            <input type="range" min="1" max="150" v-model="thickness">
            <input type="number" step="1" v-model="thickness">
            </label>
    </div>
</template>

<script>
let cv = require('opencv.js');
export default {
    name: 'TabSketch',
    mounted() {
        this.$store.state.currentTool = 'sketch'
        this.emitter.on('drag', (pos) => {
            cv.line(this.$store.state.viewport.canvas_mat, pos.last, pos.current, this.color, parseInt(this.thickness), cv.LINE_AA)
            this.$store.commit('viewport/renderCanvas')
        })
    },
    unmounted(){
        this.emitter.off('drag')
    },
    data() { 
        return {
            color: [0, 0, 0, 255],
            thickness: 3
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

input[type='number'] {
    width: 60px;
}

label{
    vertical-align: middle;
    font-size: 20px;
}
</style>