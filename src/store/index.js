// let cv = require('opencv.js');
import { createStore } from 'vuex'
import viewport from './modules/viewport.js'

export default createStore({
    modules: {
        viewport: viewport
    },
    state() {
        return {
            colorPicked: [0, 0, 0, 255]
        }
    },
})