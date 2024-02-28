<script setup lang="ts">
import { ref, watch, defineProps, defineEmits } from 'vue'

const props = defineProps({
	modelValue: Boolean,
})

const emits = defineEmits(['update:modelValue'])

const isVisible = ref(props.modelValue)

watch(
	() => props.modelValue,
	newValue => {
		isVisible.value = newValue
	}
)

const closeModal = () => {
	emits('update:modelValue', false)
}
</script>

<template>
	<div v-if="isVisible" class="modal-overlay" @click.self="closeModal">
		<div class="modal-content">
			<slot></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.modal-overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.5);
	display: flex;
	justify-content: center;
	align-items: center;
	z-index: 1000;
}

.modal-content {
	border-radius: 5px;
	max-width: 500px;
	width: 100%;
}
</style>
