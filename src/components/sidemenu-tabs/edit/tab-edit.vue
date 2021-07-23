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
        <component :is="currentTabComponent" class="tab row"></component>
    </div>
</template>

<script>
import TabSketch from './tab-sketch.vue'
import TabSelect from './tab-select.vue'

export default {
    name: 'TabEdit',
    components: {
        TabSelect,
        TabSketch,
    },
    data(){
        return {
            tabs: [
                ['스케치', 'Sketch'],
                ['선택', 'Select']
            ],
            currentTab: 'Sketch'
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
</style>