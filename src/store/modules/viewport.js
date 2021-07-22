let cv = require('opencv.js');

const state = () => ({
    canvas: undefined,
    overlay: undefined,
    canvas_mat: undefined,
    overlay_mat: undefined,
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
        if(state.canvas_mat != undefined){
            state.canvas_mat.delete()
        }
        if(state.overlay_mat != undefined){
            state.overlay_mat.delete()
        }
        state.canvas_mat = Object.freeze(new cv.Mat(720, 1280, cv.CV_8UC4))
        state.overlay_mat = Object.freeze(new cv.Mat(720, 1280, cv.CV_8UC4))
        cv.rectangle(state.canvas_mat, new cv.Point(0, 0), new cv.Point(1280, 720), [255,255,255,255], -1)
    },
    setImage(state, img){
        if(state.canvas_mat != undefined){
            state.canvas_mat.delete()
        }
        if(state.overlay_mat != undefined){
            state.overlay_mat.delete()
        }
        state.canvas_mat = Object.freeze(img)
        state.overlay_mat = Object.freeze(new cv.Mat(state.canvas_mat.rows, state.canvas_mat.cols, cv.CV_8UC4))
    },
    render(state){
        //clear canvas
        let ctx = state.canvas.getContext('2d')
        ctx.clearRect(0, 0, state.canvas.width, state.canvas.height)
        

        //convert and show image
        Promise.all([
            createImageBitmap(new ImageData(new Uint8ClampedArray(state.canvas_mat.data),
                state.canvas_mat.cols, state.canvas_mat.rows)),
            createImageBitmap(new ImageData(new Uint8ClampedArray(state.overlay_mat.data),
                state.overlay_mat.cols, state.overlay_mat.rows))
        ])
        .then(function(sprs){
            state.canvas.getContext('2d').drawImage(sprs[0],
                state.canvas.width / 2 - (state.viewCenterPos.x * state.scale),
                state.canvas.height / 2 - (state.viewCenterPos.y * state.scale),
                sprs[0].width * state.scale, sprs[0].height * state.scale)
            state.overlay.getContext('2d').drawImage(sprs[1],
                state.canvas.width / 2 - (state.viewCenterPos.x * state.scale),
                state.canvas.height / 2 - (state.viewCenterPos.y * state.scale),
                sprs[1].width * state.scale, sprs[1].height * state.scale)
        })
    },
    resetView(state){
        let im = state.canvas_mat
        let cv = state.canvas

        state.scale = Math.max(0.1, Math.min(1, cv.width / im.cols, cv.height / im.rows))
        state.viewCenterPos.x = state.canvas_mat.cols / 2
        state.viewCenterPos.y = state.canvas_mat.rows / 2
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