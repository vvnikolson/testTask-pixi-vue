<template>
    <slot v-if="isLoaded"></slot>
    <div class="loading" v-else>
        {{loadingText}}
    </div>
</template>

<script>
    import {ref, computed, watch, defineComponent} from 'vue'
    // Компонент-заглушка
    export default defineComponent({
        name: "AsyncLoaderWrapper",
        props: {
            waitFor: {
                required: true,
                type: Object
            }
        },

        setup(prop) {
            const loadingText = ref('')
            const isLoaded = computed(() => {
                return !!prop.waitFor
            })
            // Если к сему моменту данные не загружены, показываем простейшую "анимацию" загрузки
            if(!prop.waitFor) {

                let counter = 0
                // генерируем "кадры" анимации
                // строка "loading" с разным количеством точек в конце
                const loadingTextFrames = [...Array(4).keys()]
                    .reduce((acc, x) => [...acc, 'loading' + '.'.repeat(x)], [])
                loadingText.value = loadingTextFrames[0]
                // анимируем (с интервалом меняем кодры из массива ранее)
                const interval = setInterval(() => {

                    counter++
                    loadingText.value = loadingTextFrames[counter % loadingTextFrames.length]
                }, 300)
                // когда загрузилось, удаляем интервал, чтобы на фоне висело
                watch(isLoaded, (cur, prev) => {
                    clearInterval(interval)
                })
            }
            return {
                loadingText,
                isLoaded
            }
        }
    })
</script>

<style lang="scss" scoped>
    .loading {
        display: flex;
        margin: auto;
        font-size: 2rem;
    }
</style>