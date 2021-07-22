let cv = require('opencv.js');

const state = () => ({
    canvas: undefined,
    overlay: undefined,
    imgmat: undefined,
    scale: 1,
    viewCenterPos: new cv.Point(0, 0),
})

const mutations = {
    fitView(state){
        [state.canvas, state.overlay].forEach((v) => {
            v.style.width = '100%';
            v.style.height = '100%';
            v.width = v.offsetWidth;
            v.height = v.offsetHeight;
        })
    },
    newImage(state){
        if(state.imgmat != undefined){
            state.imgmat.delete()
        }
        state.imgmat = Object.freeze(new cv.Mat(720, 1280, cv.CV_8UC4))
        cv.rectangle(state.imgmat, new cv.Point(0, 0), new cv.Point(1280, 720), [255,255,255,255], -1)
    },
    setImage(state, img){
        if(state.imgmat != undefined){
            state.imgmat.delete()
        }
        state.imgmat = Object.freeze(img)
    },
    drawImage(state){
        //clear canvas
        let ctx = state.canvas.getContext('2d')
        ctx.clearRect(0, 0, state.canvas.width, state.canvas.height)
        

        //convert and show image
        Promise.all([
            createImageBitmap(new ImageData(new Uint8ClampedArray(state.imgmat.data),
                state.imgmat.cols, state.imgmat.rows))
        ])
        .then(function(sprs){
            state.canvas.getContext('2d').drawImage(sprs[0],
                state.canvas.width / 2 - (state.viewCenterPos.x * state.scale),
                state.canvas.height / 2 - (state.viewCenterPos.y * state.scale),
                sprs[0].width * state.scale, sprs[0].height * state.scale)
        })
    },
    resetView(state){
        let im = state.imgmat
        let cv = state.canvas

        state.scale = Math.max(0.1, Math.min(1, cv.width / im.cols, cv.height / im.rows))
        state.viewCenterPos.x = state.imgmat.cols / 2
        state.viewCenterPos.y = state.imgmat.rows / 2
    }
}

const getters = {
    canvasSize(state){
        return {width: state.canvas.width, height: state.canvas.height}
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    getters
}