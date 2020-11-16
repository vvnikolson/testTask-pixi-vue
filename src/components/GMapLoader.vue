<template>

    <div class="google-map" ref="googleMap">
    </div>
</template>

<script lang="ts">
    import { defineComponent, ref, onMounted } from 'vue'
    import { Loader } from 'google-maps'
    import {getStore} from '../store/main.store'

    export default defineComponent({
        name: "GMapLoader",
        props: {
            apiKey: {
                type: String,
                required: true
            },
            config: {
                type: Object,
                required: false,
                default: null
            }
        },
        setup(pros) {
            // забираем данные из Vuex хранилища
            const mapPlaces = getStore().getters.getMapPlaces

            // стандартные итераторы в JS не имеет метода Prev для получения предыдущего элемента
            // костылим свой якобы итератор
            let mapPlacesIter = new class<T> {
                currentIndex: number = 0
                array: Array<T>
                constructor(array: Array<T>) {
                    this.array = array
                }
                get prev(): T {
                    this.currentIndex = (this.currentIndex+this.array.length-1)%this.array.length
                    return this.curr
                }
                get next() : T {
                    this.currentIndex = (this.currentIndex+1)%this.array.length
                    return this.curr
                }
                get curr() : T {
                    return this.array[this.currentIndex]
                }
            }<{lng: number, lat: number, desc?:string}>(mapPlaces)

            const currentLoc = ref(mapPlacesIter.curr)
            const placesIter = mapPlaces.values()
            const googleMap = ref<HTMLElement | null>(null)
            const loader = new Loader(pros.apiKey)
            let map : google.maps.Map

            const prevLocation = () => {
                currentLoc.value = mapPlacesIter.prev
                map.panTo(currentLoc.value)
            }
            const nextLocation = () => {
                currentLoc.value = mapPlacesIter.next
                map.panTo(currentLoc.value)
            }

            onMounted(async () => {
                // при загрузке карты доступны как глобальный объект в window
                // при повторной инициализации ругаются
                // проверяем загружены ли они
                if(!window.google) {
                    await loader.load()
                }

                map = new google.maps.Map(googleMap.value!, {
                    zoom: 13,
                    center: placesIter.next().value,
                    disableDefaultUI: true,
                    zoomControl: true,
                    scaleControl: false
                })
                // Создаём дополнительные элементы управления прямо на карте
                // стрелки вперёд-назад и название места вверху карты
                const controlDiv = document.createElement("div");
                const controlUI = document.createElement("div");
                controlUI.style.display = 'flex'
                controlUI.style.alignItems = 'center'
                controlUI.style.backgroundColor = "#fff";
                controlUI.style.border = "2px solid #fff";
                controlUI.style.borderRadius = "3px";
                controlUI.style.boxShadow = "0 2px 6px rgba(0,0,0,.3)";
                controlUI.style.cursor = "pointer";
                controlUI.style.marginBottom = "22px";
                controlUI.title = "Click to recenter the map";
                controlDiv.appendChild(controlUI);

                const controlArrowLeft = document.createElement("span")
                controlArrowLeft.style.width = "18px"
                controlArrowLeft.style.display = "inline-block"
                controlArrowLeft.style.height = "18px"
                controlArrowLeft.style.borderStyle = "solid"
                controlArrowLeft.style.borderWidth = "9px 0px 9px 18px"
                controlArrowLeft.style.borderColor = "transparent transparent transparent #202020"
                controlArrowLeft.style.boxSizing = "border-box"
                controlArrowLeft.style.margin = "5px"

                const controlArrowRight = controlArrowLeft.cloneNode(true) as HTMLElement
                controlArrowRight.style.transform = "scale(-1, -1)"
                controlUI.appendChild(controlArrowRight)
                const placeTitle = document.createElement("span")
                placeTitle.innerText = currentLoc.value.desc ?? ''
                placeTitle.style.fontFamily = "Roboto,Arial,sans-serif";
                placeTitle.style.fontSize = "16px";
                placeTitle.style.flex = "1";
                placeTitle.style.textAlign = "center";
                placeTitle.style.lineHeight = "18px";
                placeTitle.style.width = "200px";
                controlUI.appendChild(placeTitle)
                controlUI.appendChild(controlArrowLeft)
                controlArrowLeft.addEventListener("click", () => { prevLocation(); placeTitle.innerText = currentLoc.value.desc ?? '' })
                controlArrowRight.addEventListener("click", () => { nextLocation(); placeTitle.innerText = currentLoc.value.desc ?? '' })

                map.controls[google.maps.ControlPosition.TOP_CENTER].push(controlDiv);
                // генерируем маркеры в точках интереса
                for(let place of mapPlaces.values()) {
                    new google.maps.Marker({
                        position: place,
                        map,
                        title: place.desc
                    })
                }

            })

            return { googleMap }
        }

    })
</script>

<style lang="scss" scoped>
    .google-map {
        position: relative;
        width: 100%;
        height: 600px;
    }
    .desc {
        position: absolute;
        top: 0;
        right: 50%;
        left: 50%;
    }
</style>