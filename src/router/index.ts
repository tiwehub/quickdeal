import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import TaskListPage from '../views/TaskListPage.vue'

const routes = [
	{
		path: '/',
		name: 'Home',
		component: HomePage,
	},
	{
		path: '/tasks',
		name: 'Tasks',
		component: TaskListPage,
	},
]

const router = createRouter({
	history: createWebHistory(),
	routes,
})

export default router
