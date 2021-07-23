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

        //  ※※ 리팩터 필요 ※※
        this.emitter.on('draw-histogram', () => {
            let src = this.$store.state.viewport.canvas_mat
            let tmp = new cv.Mat()
            cv.cvtColor(src, tmp, cv.COLOR_RGBA2GRAY, 0);
            let srcVec = new cv.MatVector();
            let rgbaPlanes = new cv.MatVector();
            cv.split(src, rgbaPlanes);
            srcVec.push_back(tmp);
            let accumulate = false;
            let channels = [0];
            let histSize = [256];
            let ranges = [0, 255];
            let hist = new cv.Mat();
            let mask = new cv.Mat();
            let color = new cv.Scalar(255, 0, 0, 255);
            let scale = 1;
            // You can try more different parameters
            cv.calcHist(srcVec, channels, mask, hist, histSize, ranges, accumulate);
            let result = cv.minMaxLoc(hist, mask);
            let max = result.maxVal;
            let dst = new cv.Mat(tmp.rows, histSize[0] * scale,
                                    cv.CV_8UC4);
            cv.rectangle(dst, new cv.Point(0, 0), new cv.Point(dst.cols, dst.rows), [0, 0, 0, 255], cv.FILLED)
            // draw histogram
            let point1 = new cv.Point(0, 0)
            for (let i = 0; i < histSize[0]; i++) {
                let binVal = hist.data32F[i] * tmp.rows / max;
                let point2 = new cv.Point((i + 1) * scale - 1, tmp.rows - binVal);
                cv.line(dst, point1, point2, color, 1, cv.LINE_AA);
                point1 = point2
            }


            accumulate = false;
            histSize = [256];
            ranges = [0, 255];
            hist = new cv.Mat();
            mask = new cv.Mat();
            color = new cv.Scalar(0, 255, 0, 255);
            scale = 1;
            channels[0] = 1
            cv.calcHist(rgbaPlanes, channels, mask, hist, histSize, ranges, accumulate);
            result = cv.minMaxLoc(hist, mask);
            max = result.maxVal;
            // draw histogram
            point1 = new cv.Point(0, 0)
            for (let i = 0; i < histSize[0]; i++) {
                let binVal = hist.data32F[i] * tmp.rows / max;
                let point2 = new cv.Point((i + 1) * scale - 1, tmp.rows - binVal);
                cv.line(dst, point1, point2, color, 1, cv.LINE_AA);
                point1 = point2
            }

            

            accumulate = false;
            histSize = [256];
            ranges = [0, 255];
            hist = new cv.Mat();
            mask = new cv.Mat();
            color = new cv.Scalar(0, 0, 255, 255);
            scale = 1;
            channels[0] = 2
            cv.calcHist(rgbaPlanes, channels, mask, hist, histSize, ranges, accumulate);
            result = cv.minMaxLoc(hist, mask);
            max = result.maxVal;
            // draw histogram
            point1 = new cv.Point(0, 0)
            for (let i = 0; i < histSize[0]; i++) {
                let binVal = hist.data32F[i] * tmp.rows / max;
                let point2 = new cv.Point((i + 1) * scale - 1, tmp.rows - binVal);
                cv.line(dst, point1, point2, color, 1, cv.LINE_AA);
                point1 = point2
            }


            cv.imshow('histogram', dst);
            tmp.delete(); dst.delete(); srcVec.delete(); mask.delete(); hist.delete();

        })
        //this.drawHistogram()
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