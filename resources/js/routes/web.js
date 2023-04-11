/**
 * First we will load this project's JavaScript dependencies which
 * includes Vue-Router library. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
import { createRouter, createWebHistory } from 'vue-router'

/**
 * Next, we will create a fresh Vue Frontend Routes. You may then begin
 * registering components with the application instance so they are ready
 * to use in your application's views. An example is included for you.
 */
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: {
                name: 'home',
            }
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../views/user/Home.vue'),
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/dashboard',
            name: 'dashboard',
            component: () => import('../views/user/Dashboard.vue'),
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/posts',
            name: 'post',
            component: () => import('../views/user/Post.vue'),
            meta: {
                requiresAuth: true,
            }
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/user/auth/Login.vue'),
            meta: {
                guest: true
            }
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../views/user/auth/Register.vue'),
            meta: {
                guest: true
            }
        },
        {
            path: '/:pathMatch(.*)*',
            component: () => import('../views/404.vue')
        }
    ]
})
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const guest = to.matched.some(record => record.meta.guest);
    const isLoggedIn = localStorage.getItem('userToken');
    if (requiresAuth && !isLoggedIn) {
        next({ name: 'login' });
    } else if (guest && isLoggedIn) {
        next({ name: 'home' });
    } else {
        next();
    }
});
export default router
