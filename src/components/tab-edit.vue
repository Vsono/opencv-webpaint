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
            tabs: ['Select', 'Sketch'],
            currentTab: 'Select'
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