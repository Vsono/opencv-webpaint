<template>
    <div class="p-3">
        <button type="button" class="btn btn-light" @click="newImage">새로 만들기</button>
        <label for="img-upload" class="btn btn-light">이미지 열기</label>
        <input id="img-upload" type="file" @change="loadImage" onclick="this.value=null">
        <button type="button" class="btn btn-light" @click="exportImage">저장</button>
        <img src="" id="temp-img" style="display: none;">
    </div>
</template>

<script>
let cv = require('opencv.js');

export default {
    name: 'TabFile',
    data(){
        return {
        }
    },
    mounted(){
            let img_container = document.getElementById('temp-img')
            img_container.onload = () => {
                let img = cv.imread(img_container)
                this.$store.commit('viewport/setImage', img)
                this.$store.commit('viewport/resetView')
                this.$store.commit('viewport/renderCanvas')
                this.$store.commit('viewport/renderOverlay')
            }
    },
    methods: {
        loadImage(e){
            document.getElementById('temp-img').src = URL.createObjectURL(e.target.files[0])
        },
        newImage(){
            this.$store.commit('viewport/newImage')
            this.$store.commit('viewport/resetView')
            this.$store.commit('viewport/renderCanvas')
            this.$store.commit('viewport/renderOverlay')
        },
        exportImage(){
            let c = document.createElement('canvas')
            let im = this.$store.state.viewport.canvas_mat
            let id = new ImageData(new Uint8ClampedArray(im.data), im.cols, im.rows)
            c.width = id.width; c.height = id.height
            c.getContext('2d').putImageData(id, 0, 0)
            document.getElementById('temp-img').src = c.toDataURL()

            let a = document.createElement('a')
            a.download = 'export.png'
            a.href=c.toDataURL()
            a.click()
            a.remove()
        }
    }
}
</script>

<style scoped>
div {
    /* background-color: rgb(29, 29, 29); */
    padding: 50px;
    /* flex: 1 1 auto; */
}

button, label {
    height: 40px;
    margin-bottom: 20px;
}

input[type="file"] {
    display: none;
}

</style>