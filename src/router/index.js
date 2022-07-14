import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'login',
        meta: {layout: 'auth'},
        component: () => import('../views/LoginView.vue')
    },
    {
        path: '/register',
        name: 'register',
        meta: {layout: 'auth'},
        component: () => import('../views/RegisterView.vue')
    },
    {
        path: '/home',
        name: 'home',
        meta: {layout: 'main'},
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/history',
        name: 'history',
        meta: {layout: 'main'},
        component: () => import('../views/HistoryView.vue')
    },
    {
        path: '/profile',
        name: 'profile',
        meta: {layout: 'main'},
        component: () => import('../views/ProfileView.vue')
    },
    {
        path: '/record',
        name: 'record',
        meta: {layout: 'main'},
        component: () => import('../views/RecordView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
