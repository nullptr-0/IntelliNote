import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotesView from '../views/NotesView.vue'
import SearchView from '../views/SearchView.vue'
import CalendarView from '../views/CalendarView.vue'
import NotFoundView from '../views/NotFoundView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/notes',
            name: 'notes',
            component: NotesView
        },
        {
            path: '/search',
            name: 'search',
            component: SearchView
        },
        {
            path: '/calendar',
            name: 'calendar',
            component: CalendarView
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notfound',
            component: NotFoundView
        }
    ]
})

export default router
