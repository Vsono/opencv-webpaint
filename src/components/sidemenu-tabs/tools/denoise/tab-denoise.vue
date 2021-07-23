<template>
    <div class="p-0">
        <div class="accordion" id="accordionExample">
            <div class="accordion-item" v-for="tab in tabs" :key="tab[1]">
                <h2 class="accordion-header" :id="'heading'+tab[1]">
                    <button class="accordion-button" type="button" 
                    data-bs-toggle="collapse" :data-bs-target="'#collapse'+tab[1]" 
                    aria-expanded="true" :aria-controls="'collapse'+tab[1]"
                    @click="currentTab=tab[1]">
                    {{ tab[0] }}
                    </button>
                </h2>
                <div :id="'collapse'+tab[1]" class="accordion-collapse collapse" 
                :aria-labelledby="'heading'+tab[1]" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                    <component :is="'tab-' + tab[1].toLowerCase()" class="tab row" @filterSelected="$emit('filterSelected')" :parentsTab="currentTab"></component>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import TabAvgBlur from './tab-avg-blur.vue'
import TabGaussianBlur from './tab-gaussian-blur.vue'
import TabBilateralFilter from './tab-bilateral-filter.vue'

export default {
    name: 'TabDenoise',
    components: {
        TabAvgBlur,
        TabGaussianBlur,
        TabBilateralFilter
    },
    beforeUnmount(){
        this.$emit('discard')
    },
    data() {
        return {
            tabs: [
                ['평균 블러', 'avg-blur'],
                ['가우시안 블러', 'gaussian-blur'],
                ['바이레터럴 필터', 'bilateral-filter'],
            ],
            currentTab: '',
        }
    },
    methods: {
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

.accordion-body,
.accordion-button,
.accordion-header,
.accordion-item,
.accoridon {
    background-color: rgba(0,0,0,0);
    color: white;
}

.accordion-header {
    background-color: rgb(26, 26, 26);
}
</style>