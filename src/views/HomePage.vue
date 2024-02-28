<script setup lang="ts">
import MainLayout from '../layouts/MainLayout.vue'
import TaskList from '@/components/TaskList.vue'
import Notification from '@/components/Notification.vue'
</script>

<template>
	<MainLayout>
		<TaskList />
		<Notification />
	</MainLayout>
</template>

<style lang="scss" scoped></style>
