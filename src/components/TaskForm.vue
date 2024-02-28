<script setup lang="ts">
import { ref, watchEffect, toRefs, defineProps, defineEmits } from 'vue'
import { useStore } from 'vuex'

const props = defineProps({
	editTask: Object,
})

const emits = defineEmits(['close'])

const { editTask } = toRefs(props)

const taskName = ref('')
const taskDescription = ref('')
const taskDueDate = ref('')
const taskCategory = ref('')
const taskTags = ref([])
const taskImportance = ref(50)
const tagsOptions = ['Срочно', 'Важно', 'Долгосрочно']
const validationErrors = ref({
	taskName: false,
	taskDescription: false,
	taskDueDate: false,
	taskCategory: false,
	taskTags: false,
})

const store = useStore()

watchEffect(() => {
	if (props.editTask) {
		taskName.value = props.editTask.name || ''
		taskDescription.value = props.editTask.description || ''
		taskDueDate.value = props.editTask.dueDate || ''
		taskCategory.value = props.editTask.category || ''
		taskTags.value = props.editTask.tags || []
		taskImportance.value = props.editTask.importance || 50
	} else {
		taskName.value = ''
		taskDescription.value = ''
		taskDueDate.value = ''
		taskCategory.value = ''
		taskTags.value = []
		taskImportance.value = 50
	}
})

const validateForm = () => {
	validationErrors.value.taskName = !taskName.value
	validationErrors.value.taskDescription = !taskDescription.value
	validationErrors.value.taskDueDate = !taskDueDate.value
	validationErrors.value.taskCategory = !taskCategory.value
	validationErrors.value.taskTags = taskTags.value.length === 0

	return Object.values(validationErrors.value).every(v => !v)
}

const submitForm = () => {
	if (!validateForm()) {
		return
	}

	const task = {
		id: editTask.value ? editTask.value.id : Date.now(),
		name: taskName.value,
		description: taskDescription.value,
		dueDate: taskDueDate.value,
		category: taskCategory.value,
		tags: taskTags.value,
		importance: taskImportance.value,
	}

	if (editTask.value) {
		store.dispatch('editTask', task)
	} else {
		store.dispatch('addTask', task)
	}

	taskName.value = ''
	taskDescription.value = ''
	taskDueDate.value = ''
	taskCategory.value = ''
	taskTags.value = []
	taskImportance.value = 50

	emits('close')
}
</script>

<template>
	<form @submit.prevent="submitForm" class="task-form">
		<div class="form-body">
			<div class="form-column">
				<div class="form-group" :class="{ error: validationErrors.taskName }">
					<label for="taskName" class="form-label">Название задачи</label>
					<input
						v-model="taskName"
						type="text"
						id="taskName"
						name="taskName"
						class="form-input"
						placeholder="Введите название задачи"
					/>
					<span v-if="validationErrors.taskName" class="error-message"
						>Это поле обязательно к заполнению</span
					>
				</div>
				<div
					class="form-group"
					:class="{ error: validationErrors.taskDescription }"
				>
					<label for="taskDescription" class="form-label">Описание</label>
					<textarea
						v-model="taskDescription"
						id="taskDescription"
						class="form-textarea"
						placeholder="Описание задачи"
					></textarea>
					<span v-if="validationErrors.taskDescription" class="error-message"
						>Это поле обязательно к заполнению</span
					>
				</div>
				<div
					class="form-group"
					:class="{ error: validationErrors.taskDueDate }"
				>
					<label for="taskDueDate" class="form-label">Дата выполнения</label>
					<input
						v-model="taskDueDate"
						type="date"
						id="taskDueDate"
						class="form-input"
					/>
					<span v-if="validationErrors.taskDueDate" class="error-message"
						>Это поле обязательно к заполнению</span
					>
				</div>
			</div>
			<div class="form-column">
				<div
					class="form-group"
					:class="{ error: validationErrors.taskCategory }"
				>
					<label class="form-label">Категория</label>
					<div class="category-options">
						<label class="category-option">
							<input
								type="radio"
								value="Работа"
								v-model="taskCategory"
								class="form-radio"
							/>
							Работа
						</label>
						<label class="category-option">
							<input
								type="radio"
								value="Личное"
								v-model="taskCategory"
								class="form-radio"
							/>
							Личное
						</label>
						<label class="category-option">
							<input
								type="radio"
								value="Учеба"
								v-model="taskCategory"
								class="form-radio"
							/>
							Учеба
						</label>
					</div>
					<span v-if="validationErrors.taskCategory" class="error-message"
						>Это поле обязательно к заполнению</span
					>
				</div>
				<div class="form-group">
					<label class="form-label">Теги</label>
					<div class="tag-options">
						<div v-for="tag in tagsOptions" :key="tag" class="tag-option">
							<input
								type="checkbox"
								:id="tag"
								:value="tag"
								v-model="taskTags"
								class="form-checkbox"
							/>
							<label :for="tag">{{ tag }}</label>
						</div>
					</div>
					<span v-if="validationErrors.taskTags" class="error-message"
						>Выберите хотя бы один тег</span
					>
				</div>
				<div class="form-group">
					<label for="taskImportance" class="form-label"
						>Уровень важности</label
					>
					<input
						type="range"
						v-model="taskImportance"
						min="0"
						max="100"
						id="taskImportance"
						class="form-range"
					/>
				</div>
			</div>
		</div>
		<button type="submit" class="form-button">
			{{ props.editTask ? 'Редактировать запись' : 'Создать запись' }}
		</button>
	</form>
</template>

<style scoped lang="scss">
.task-form {
	@apply bg-white p-6 rounded-lg shadow-lg;

	.form-body {
		@apply flex flex-wrap -mx-2 justify-between;

		.form-column {
			@apply px-2 w-full md:w-1/2;

			.form-group {
				@apply mb-4;

				.form-label {
					@apply block mb-2 font-semibold;
				}

				.form-input,
				.form-textarea {
					@apply p-2 border border-gray-300 rounded-md w-full;
				}

				.form-range {
					@apply w-full;
				}

				.form-textarea {
					@apply resize-none h-24;
				}

				.form-radio,
				.form-checkbox {
					@apply mr-2 align-top;
				}
			}
		}
	}

	.category-options,
	.tag-options {
		@apply flex flex-wrap;

		.category-option,
		.tag-option {
			@apply flex items-center mr-4 mb-2;
		}
	}

	.form-button {
		@apply mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 w-full md:w-auto;
	}

	.form-range {
		@apply cursor-pointer;
	}

	.error-message {
		@apply text-red-500 text-sm;
	}

	.form-group.error {
		.form-input,
		.form-textarea {
			@apply border-red-500;
		}
	}
}
</style>
