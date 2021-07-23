<template>
    <div class="p-3">
        <div class="btn-group-vertical">
            <button class="btn btn-dark" @click="rgb2bgr">RGB to BGR</button>
            <button class="btn btn-dark" @click="rgb2hsv">RGB to HSV</button>
            <button class="btn btn-dark" @click="hsv2rgb">HSV to RGB</button>
        </div>
    </div>
</template>

<script>
let cv = require('opencv.js');
export default {
    name: 'TabCvtColor',
    data() {
        return {
        }
    },
    methods: {
        rgb2bgr() {
            cv.cvtColor(this.$store.state.viewport.canvas_mat,
            this.$store.state.viewport.overlay_mat, cv.COLOR_RGBA2BGRA)

            this.$store.commit('viewport/renderOverlay')
            this.$emit('filterSelected')
        },
        rgb2hsv() {
            let overlay = this.$store.state.viewport.overlay_mat

            cv.cvtColor(this.$store.state.viewport.canvas_mat, overlay, cv.COLOR_RGBA2RGB)
            cv.cvtColor(overlay, overlay, cv.COLOR_RGB2HSV)
            cv.cvtColor(overlay, overlay, cv.COLOR_RGB2RGBA)

            this.$store.commit('viewport/renderOverlay')
            this.$emit('filterSelected')
        },
        hsv2rgb() {
            let overlay = this.$store.state.viewport.overlay_mat

            cv.cvtColor(this.$store.state.viewport.canvas_mat, overlay, cv.COLOR_RGBA2RGB)
            cv.cvtColor(overlay, overlay, cv.COLOR_HSV2RGB)
            cv.cvtColor(overlay, overlay, cv.COLOR_RGB2RGBA)

            this.$store.commit('viewport/renderOverlay')
            this.$emit('filterSelected')
        },
    }
}
</script>

<style scoped>
</style>