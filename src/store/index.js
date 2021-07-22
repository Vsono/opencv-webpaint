import { createStore } from 'vuex'
import viewport from './modules/viewport.js'
import sketch from './modules/sketch.js'

export default createStore({
    modules: {
        viewport: viewport,
        sketch: sketch
    },
    state() {
        return {
            currentTool: null
        }
    },
})