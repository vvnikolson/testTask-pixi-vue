import { createRouter, RouteRecordRaw, createWebHashHistory } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'HomePage',
        component: () => import('../pages/Home.vue')
    },
    {
        path: '/map',
        name: 'MapPage',
        component: () => import('../pages/Map.vue')
    },
    {
        path: '/timer',
        name: 'TimerPage',
        component: () => import('../pages/Timer.vue')
    }
]

export default createRouter({
    history: createWebHashHistory(), //createWebHistory()
    routes
})