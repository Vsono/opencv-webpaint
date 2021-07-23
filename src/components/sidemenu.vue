<template>
    <div class="sidemenu col vh-100">
        <div class="row">
            <div class="btn-group btn-group-toggle">
                <label v-for="tab in tabs" :key="tab[1]"
                class="btn btn-dark" :class="{active: currentTab == tab[1]}"
                @click="currentTab = tab[1]">
                    {{ tab[0] }}
                </label>
            </div>
        </div>
        <div class="divider"></div>
        <component :is="currentTabComponent" class="tab row"></component>
        <canvas id='histogram' @click="drawHistogram"></canvas>
    </div>
</template>

<script>
let cv = require('opencv.js');

import TabFile from './tab-file.vue'
import TabEdit from './tab-edit.vue'
import TabTools from './tab-tools.vue'

export default ({
    name: 'SideMenu',
    components: {
        TabFile,
        TabEdit,
        TabTools
    },
    mounted() {
        this.emitter.on('draw-histogram', () => {
            let src = this.$store.state.viewport.canvas_mat
            let rgbaPlanes = new cv.MatVector();
            cv.split(src, rgbaPlanes);
            
            let histSize = [256];
            let scale = 1;
            let mask = new cv.Mat();

            let max = 0
            let hists = []
            for(let i = 0; i < 3; i++){
                let channels = [i];
                let hist = new cv.Mat();
                cv.calcHist(rgbaPlanes, channels, mask, hist, histSize, [0, 255]);

                let result = cv.minMaxLoc(hist);
                if(result.maxVal > max)
                    max = result.maxVal
                
                hists.push(hist)
            }

            //히스토그램 그리기
            let dst = new cv.Mat(src.rows, histSize[0] * scale, cv.CV_8UC4);
            cv.rectangle(dst, new cv.Point(0, 0), new cv.Point(dst.cols, dst.rows), [0, 0, 0, 255], cv.FILLED)
            hists.forEach((hist, i) => {
                let color = [0,0,0,255]
                color[i] = 255
                let point1 = new cv.Point(0, 0)
                for (let x = 0; x < histSize[0]; x++){
                    let binVal = hist.data32F[x] * src.rows / max;
                    let point2 = new cv.Point((x + 1) * scale - 1, src.rows - binVal);
                    cv.line(dst, point1, point2, color, 1, cv.LINE_AA);
                    point1 = point2
                }
            })

            cv.imshow('histogram', dst);

            mask.delete()
            dst.delete();
            hists.forEach((hist)=>{hist.delete()})

        })
    },
    data(){
        return {
            tabs: [
                ['파일', 'File'], 
                ['편집', 'Edit'], 
                ['도구', 'Tools']
            ],
            currentTab: 'File'
        }
    },
    methods: {
        drawHistogram() {
            this.emitter.emit('draw-histogram')
        }
    },
    computed: {
        currentTabComponent() {
            return 'tab-' + this.currentTab.toLowerCase()
        }
    }
})
</script>

<style>
.divider {
    height: 2px;
    background-color: rgb(63, 63, 63);
    border-top: rgb(122, 122, 122) 1px solid;
}

.btn-dark { 
    background-color: rgb(69, 67, 73);
}
</style>

<style scoped>
div{
    color: white;
    padding: 0px;
    margin: 0px;
}

.sidemenu {
    display: flex;
    flex-flow: column;
    
    background-color: rgb(41, 41, 41);
    width: 400px;
    min-width: 400px;
    max-width: 400px;
}

.active {
    background-color: black;
}

#histogram{
    width: 100%;
    height: 200px;
    background-color: rgb(87, 87, 87);
}
</style>