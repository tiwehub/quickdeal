<script setup lang="ts">
import MainLayout from '@/layouts/MainLayout.vue'
import TaskForm from '@/components/TaskForm.vue'
import Notification from '@/components/Notification.vue'
</script>

<template>
	<MainLayout>
		<TaskForm />
		<Notification />
	</MainLayout>
</template>

<style lang="scss" scoped></style>
