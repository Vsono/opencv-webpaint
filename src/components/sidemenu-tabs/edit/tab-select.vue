<template>
    <div class="p-3">
        
    </div>
</template>

<script>
let cv = require('opencv.js');
export default {
    name: 'TabSelect',
    mounted() {
        this.$store.state.currentTool = 'select'
        this.emitter.on('drag', (pos) => {
            this.$store.commit('viewport/clearOverlay')
            cv.rectangle(this.$store.state.viewport.overlay_mat, pos.start, pos.current, [0,0,0,255], 1)
            this.$store.commit('viewport/renderOverlay')
        })
    },
    unmounted(){
        this.$store.commit('viewport/clearOverlay')
        this.$store.commit('viewport/renderOverlay')
        this.emitter.off('drag')
    },
    methods: {
    }
}
</script>

<style scoped>

</style>