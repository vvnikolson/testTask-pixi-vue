<template>

    <div class="container">

        <nav class="navbar">
            <router-link class="navbar_links" :to="{name: 'HomePage'}">Home</router-link>
            <router-link class="navbar_links" :to="{name: 'MapPage'}">Map</router-link>
            <router-link class="navbar_links" :to="{name: 'TimerPage'}">Timer</router-link>
        </nav>
        <router-view />
    </div>

</template>

<script>
    import { defineComponent,  } from 'vue'
    import { store } from './store/main.store'
    import { ActionTypes as UserInfoActionTypes } from './store/userInfo.store'
    import { MutationTypes as VisitTimeMutationTypes } from './store/visitTime.store'

    export default defineComponent({
        name: "App",

        setup() {
            // вызываем хранилища Vuex, загружаем данные
            store.dispatch(UserInfoActionTypes.getUserInfo)
            store.commit(VisitTimeMutationTypes.RESET_VISIT_TIME)
        }
    })
</script>

<style lang="scss" scoped>
    .navbar {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-items: stretch;
        width: 100%;
        background-color: #4d4d4d;
        &_links {
            font-size: 1.2rem;
            padding: 1rem 2rem;
            height: 100%;
            text-decoration: none;
            color: #efefef;

            &:hover {
                background-color: rgba(0, 0, 0, 0.3);
            }
        }
    }
    .container {
        max-width: 1280px;
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-right: auto;
        margin-left: auto;
    }
</style>