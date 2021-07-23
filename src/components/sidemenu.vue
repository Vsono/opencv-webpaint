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
        <histogram></histogram>
    </div>
</template>

<script>

import TabFile from './sidemenu-tabs/file/tab-file.vue'
import TabEdit from './sidemenu-tabs/edit/tab-edit.vue'
import TabTools from './sidemenu-tabs/tools/tab-tools.vue'
import Histogram from './histogram.vue'

export default ({
    name: 'SideMenu',
    components: {
        TabFile,
        TabEdit,
        TabTools,
        Histogram
    },
    mounted() {
        
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

</style>