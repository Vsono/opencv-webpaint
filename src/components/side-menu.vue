<template>
    <div class="sidemenu col vh-100">
        <div class="row">
            <div class="btn-group btn-group-toggle">
                <label v-for="tab in tabs" :key="tab"
                class="btn btn-dark" :class="{active: currentTab == tab}"
                @click="currentTab = tab">
                    {{ tab }}
                </label>
            </div>
        </div>
        <component :is="currentTabComponent" class="tab row"></component>
    </div>
</template>

<script>
import TabFile from './tab-file.vue'
import TabEdit from './tab-edit.vue'

export default ({
    name: 'SideMenu',
    components: {
        TabFile,
        TabEdit
    },
    data(){
        return {
            tabs: ['File', 'Edit'],
            currentTab: 'File'
        }
    },
    computed: {
        currentTabComponent() {
            return 'tab-' + this.currentTab.toLowerCase()
        }
    }
})
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