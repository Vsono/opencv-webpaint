<template>
    <div class="p-3">
        
    </div>
</template>

<script>
export default {
    name: 'TabSelect',
    mounted() {
        this.$store.state.currentTool = 'select'
    },
    unmounted(){
        this.emitter.off('drag')
    },
    methods: {
    }
}
</script>

<style scoped>

</style>