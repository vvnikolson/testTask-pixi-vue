<template>
    <async-loader-wrapper :wait-for="awaitedData">
        <g-map-loader api-key=""/>
    </async-loader-wrapper>
</template>

<script lang="ts">
    import { defineComponent, computed } from 'vue'
    import GMapLoader from "../components/GMapLoader.vue";
    import AsyncLoaderWrapper from "../components/LoadingWrapper.vue"
    import {getStore} from "../store/main.store";

    export default defineComponent({
        name: "Map",
        components: {GMapLoader, AsyncLoaderWrapper},

        setup() {
            const store = getStore()
            return {
                awaitedData: computed(() => store.state.userInfo.info)
            }
        }
    })
</script>

<style scoped>

</style>