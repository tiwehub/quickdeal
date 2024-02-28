<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const notifications = computed(() => store.getters.notifications)
</script>

<template>
	<transition-group name="notification" tag="div" class="notification-list">
		<div
			v-for="notification in notifications"
			:key="notification"
			class="notification-list__item"
		>
			{{ notification }}
		</div>
	</transition-group>
</template>

<style scoped lang="scss">
.notification-list {
	@apply fixed top-5 right-5 z-50 flex flex-col space-y-2;
}

.notification-list__item {
	@apply bg-blue-500 text-white p-4 rounded-lg shadow;
}

.notification-enter-active,
.notification-leave-active {
	transition: opacity 0.5s, transform 0.5s;
}
.notification-enter,
.notification-leave-to {
	opacity: 0;
	transform: translateX(2rem);
}
</style>
