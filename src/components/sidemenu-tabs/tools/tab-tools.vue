<template>
    <div class="p-0">
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
        <component :is="currentTabComponent" class="tab row" @filterSelected="filterSelected=true" @discard="discard"></component>
        
        <div class="btn-group">
            <button class="btn btn-dark applier" @click="apply" :disabled="!filterSelected">적용</button>
            <button class="btn btn-dark applier" @click="discard">취소</button>
        </div>
    </div>
</template>

<script>
import TabCvtColor from './tab-cvt-color.vue'
import TabDenoise from './denoise/tab-denoise.vue'
import TabEdgeDetection from './edge-detection/tab-edge-detection.vue'
import TabDetection from './detection/tab-detection.vue'

export default {
    name: 'TabTools',
    components: {
        TabCvtColor,
        TabDenoise,
        TabEdgeDetection,
        TabDetection
    },
    beforeUnmount(){
        this.discard()
    },
    data() {
        return {
            tabs: [
                ['색 변환', 'cvt-color'],
                ['노이즈 제거', 'denoise'],
                ['에지 추출', 'edge-detection'],
                ['검출', 'detection'],
            ],
            currentTab: 'cvtColor',
            filterSelected: false,
        }
    },
    methods: {
        apply(){
            if(!this.filterSelected)
                return;
            this.filterSelected = false
            this.$store.state.viewport.overlay_mat.copyTo(
                this.$store.state.viewport.canvas_mat)
            this.$store.commit('viewport/clearOverlay')
            this.$store.commit('viewport/renderOverlay')
            this.$store.commit('viewport/renderCanvas')
            this.emitter.emit('draw-histogram')
        },
        discard(){
            this.filterSelected = false
            this.$store.commit('viewport/clearOverlay')
            this.$store.commit('viewport/renderOverlay')
        }
    },
    computed: {
        currentTabComponent() {
            return 'tab-' + this.currentTab.toLowerCase()
        }
    }
}
</script>

<style scoped>
div{
    color: white;
    padding: 0px;
    margin: 0px;
}

.sidemenu {
    display: flex;
    flex-flow: column;
    
    background-color: rgb(26, 26, 26);
    width: 300px;
    min-width: 300px;
    max-width: 300px;
}

.active {
    background-color: black;
}

.applier{
    margin-top: 10px;
}
</style>