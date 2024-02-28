<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineProps, defineEmits } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const emits = defineEmits(['editTask'])

const props = defineProps({
	taskId: {
		type: Number,
		required: true,
	},
})

const deleteTask = () => {
	store.dispatch('deleteTask', props.taskId)
	isOpen.value = false
}

const startEdit = () => {
	emits('editTask', props.taskId)
	isOpen.value = false
}

const isOpen = ref(false)

function toggleDropdown(event) {
	isOpen.value = !isOpen.value
	event.stopPropagation()
}

function closeDropdown() {
	isOpen.value = false
}

function beforeEnter(el) {
	el.style.opacity = 0
	el.style.transform = 'translateY(-20px)'
}

function enter(el, done) {
	el.offsetHeight
	el.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
	el.style.opacity = 1
	el.style.transform = 'translateY(0)'
	done()
}

function leave(el, done) {
	el.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
	el.style.opacity = 0
	el.style.transform = 'translateY(-20px)'
	setTimeout(() => done(), 500)
}

function handleClickOutside(event) {
	const dropdown = document.querySelector('.dropdown')
	if (dropdown && !dropdown.contains(event.target)) {
		closeDropdown()
	}
}

onMounted(() => {
	document.addEventListener('mousedown', handleClickOutside)
})

onUnmounted(() => {
	document.removeEventListener('mousedown', handleClickOutside)
})
</script>

<template>
	<div class="dropdown relative">
		<button @click="toggleDropdown" class="dropdown__button">
			<svg class="dropdown__icon" viewBox="0 0 24 24">
				<path
					d="M12 6a2 2 0 110-4 2 2 0 010 4zm0 8a2 2 0 110-4 2 2 0 010 4zm-2 6a2 2 0 104 0 2 2 0 00-4 0z"
				/>
			</svg>
		</button>
		<transition
			name="fade"
			@before-enter="beforeEnter"
			@enter="enter"
			@leave="leave"
		>
			<div v-if="isOpen" class="dropdown__menu">
				<div class="dropdown__content" role="none">
					<a href="#" class="dropdown__item" @click="deleteTask">Удалить</a>
					<a href="#" class="dropdown__item" @click="startEdit"
						>Редактировать</a
					>
				</div>
			</div>
		</transition>
	</div>
</template>

<style lang="scss" scoped>
.dropdown__button {
	@apply inline-flex justify-center w-full;
}

.dropdown__icon {
	@apply inline-block h-6 w-6 fill-current hover:fill-blue-500 duration-200 transition-all ease-in-out;
}

.dropdown__menu {
	@apply origin-top-right absolute right-0 mt-2 shadow-lg bg-white border-2 border-dashed border-gray-200 rounded-lg z-10;
}

.dropdown__content {
	@apply py-1;
}

.dropdown__item {
	@apply text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100;
}
</style>
