import { createStore } from 'vuex'

const store = createStore({
	state: {
		tasks: JSON.parse(localStorage.getItem('tasks') || '[]'),
		notifications: [],
	},
	mutations: {
		addTask(state, task) {
			state.tasks.push(task)
			localStorage.setItem('tasks', JSON.stringify(state.tasks))
		},
		deleteTask(state, taskId) {
			const index = state.tasks.findIndex(task => task.id === taskId)
			if (index !== -1) {
				state.tasks.splice(index, 1)
				localStorage.setItem('tasks', JSON.stringify(state.tasks))
			}
		},
		editTask(state, updatedTask) {
			const index = state.tasks.findIndex(task => task.id === updatedTask.id)
			if (index !== -1) {
				state.tasks[index] = updatedTask
				localStorage.setItem('tasks', JSON.stringify(state.tasks))
			}
		},
		showNotification(state, message) {
			state.notifications.push(message)
		},
		clearNotification(state) {
			state.notifications.shift()
		},
	},
	actions: {
		addTask({ commit }, task) {
			commit('addTask', task)
			commit('showNotification', `Задача "${task.name}" была создана.`)
			setTimeout(() => {
				commit('clearNotification')
			}, 3000)
		},
		deleteTask({ commit }, taskId) {
			commit('deleteTask', taskId)
			commit('showNotification', 'Задача удалена.')
			setTimeout(() => {
				commit('clearNotification')
			}, 3000)
		},
		editTask({ commit }, updatedTask) {
			commit('editTask', updatedTask)
			commit('showNotification', `Задача "${updatedTask.name}" обновлена.`)
			setTimeout(() => {
				commit('clearNotification')
			}, 3000)
		},
	},
	getters: {
		tasks: state => state.tasks,
		notifications: state => state.notifications,
	},
})

export default store
