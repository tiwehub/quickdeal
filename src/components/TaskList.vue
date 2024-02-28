<script setup lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import DropdownMenu from './DropdownMenu.vue'
import Modal from './Modal.vue'
import TaskForm from './TaskForm.vue'

const store = useStore()
const tasks = computed(() => store.state.tasks)
const isModalOpen = ref(false)
const currentTask = ref(null)

const openEditModal = taskId => {
	const task = tasks.value.find(t => t.id === taskId)
	if (task) {
		currentTask.value = task
		isModalOpen.value = true
	}
}
</script>

<template>
	<div class="task-table">
		<table class="task-table__base">
			<thead class="task-table__head">
				<tr class="task-table__row">
					<th class="task-table__header">Название задачи</th>
					<th class="task-table__header">Описание</th>
					<th class="task-table__header">Дата выполнения</th>
					<th class="task-table__header">Категория</th>
					<th class="task-table__header">Теги</th>
					<th class="task-table__header">Уровень важности</th>
					<th class="task-table__header task-table__header--actions"></th>
				</tr>
			</thead>
			<tbody>
				<tr class="task-table__row" v-for="task in tasks" :key="task.id">
					<td class="task-table__cell">
						<div class="task-table__content">
							<p class="task-table__text">{{ task.name }}</p>
						</div>
					</td>
					<td class="task-table__cell">
						<p class="task-table__description">{{ task.description }}</p>
					</td>
					<td class="task-table__cell">
						<p class="task-table__date">{{ task.dueDate }}</p>
					</td>
					<td class="task-table__cell">
						<p class="task-table__category">{{ task.category }}</p>
					</td>
					<td class="task-table__cell">
						<span class="task-table__tag--long-term">{{
							task.tags.join(', ')
						}}</span>
					</td>
					<td class="task-table__cell">
						<span
							class="task-table__importance"
							:class="{ 'task-table__importance--high': task.importance > 50 }"
							>{{ task.importance }}%</span
						>
					</td>
					<td class="task-table__cell task-table__cell--actions">
						<DropdownMenu
							@editTask="openEditModal(task.id)"
							:taskId="task.id"
						/>
					</td>
				</tr>
			</tbody>
		</table>
		<Modal v-model="isModalOpen">
			<TaskForm :editTask="currentTask" @close="isModalOpen = false" />
		</Modal>
	</div>
</template>

<style lang="scss" scoped>
.task-table {
	overflow: auto;
	min-height: calc(100vh - 100px);
	max-height: calc(100vh - 100px);

	.task-table__base {
		@apply min-w-full leading-normal;
	}
	.task-table__head {
		@apply bg-gray-100;
	}
	.task-table__row {
	}
	.task-table__header {
		@apply px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider sticky top-0 bg-white z-10;
	}
	.task-table__header--actions {
		@apply bg-white;
	}

	.task-table__cell {
		@apply px-5 py-5 border-b border-gray-200 bg-white text-sm;
	}

	.task-table__cell--actions {
		@apply text-right;
	}

	.task-table__content {
	}

	.task-table__text,
	.task-table__description,
	.task-table__date,
	.task-table__category {
		@apply text-gray-900 whitespace-nowrap;
	}

	.task-table__tag {
		@apply relative inline-block px-3 py-1 font-semibold leading-tight;
	}

	.task-table__tag--long-term {
		@apply text-green-900 rounded-full bg-green-200 px-2 py-0.5;
	}

	.task-table__importance {
		@apply relative inline-block px-3 py-1 font-semibold leading-tight;
	}

	.task-table__importance--high {
		@apply text-yellow-900 bg-yellow-200 rounded-full;
	}
}
</style>
