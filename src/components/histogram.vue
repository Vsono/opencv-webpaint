<template>
    <canvas class="histogram" id='histogram' @click="drawHistogram"></canvas>
</template>


<script>
let cv = require('opencv.js');
export default {
    mounted(){
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
    beforeUnmount(){
        this.emitter.off('draw-histogram')
    }
}
</script>

<style scoped>

#histogram{
    background-color: rgb(87, 87, 87);
    width: 100%;
    height: 200px;
}

</style>