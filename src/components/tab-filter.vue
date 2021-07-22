<template>
    <div class="p-0">
        <div class="row">
            <div class="btn-group btn-group-toggle">
                <label v-for="tab in tabs" :key="tab"
                class="btn btn-dark" :class="{active: currentTab == tab}"
                @click="currentTab = tab">
                    {{ tab }}
                </label>
            </div>
        </div>
        <div class="divider"></div>
        <component :is="currentTabComponent" class="tab row" @filterSelected="filterSelected=true"></component>
        
        <div class="btn-group">
            <button class="btn btn-dark applier" @click="apply" :disabled="!filterSelected">적용</button>
            <button class="btn btn-dark applier" @click="discard">취소</button>
        </div>
    </div>
</template>

<script>
import TabCvtcolor from './tab-cvt-color.vue'

export default {
    name: 'TabFilter',
    components: {
        TabCvtcolor
    },
    beforeUnmount(){
        this.discard()
    },
    data() {
        return {
            tabs: ['cvtColor'],
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
    margin-top: 50px;
}
</style>