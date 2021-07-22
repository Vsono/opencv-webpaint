<template>
    <div class="p-3">
        <input type="color" value="#000" @change="watchColorPicker">
    </div>
</template>

<script>
export default {
    name: 'TabSketch',
    data() { 
        return {

        }
    },
    methods: {
        watchColorPicker(e) {
            let i = parseInt(e.target.value.substr(1), 16)
            let r = Math.round(i / (256 * 256))
            let g = Math.round((i % (256 * 256)) / 256)
            let b = Math.round(i % (256))
            this.$store.state.sketch.colorPicked = [r, g, b, 255]
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