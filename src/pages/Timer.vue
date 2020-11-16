<template>
    <div ref="container"></div>
</template>

<script>
    import { defineComponent, onMounted, ref } from 'vue'
    import * as PIXI from 'pixi.js'
    import Engine from "../components/timer/Engine";
    import {getStore} from "../store/main.store";

    export default defineComponent({
        name: "Timer",

        setup() {
            const timestamp = getStore().getters.visitedAt
            const container = ref(null)
            const app = new PIXI.Application({
                antialias: true,
                backgroundColor: 0x000000,
                resolution: window.devicePixelRatio || 1,
                width: 1280,
                height: 800
            })

            onMounted(() => {
                container.value.appendChild(app.view)
                main.init(timestamp)

            })
            const main = new Engine(app)

            return { container }
        }
    })
</script>

<style scoped>

</style>