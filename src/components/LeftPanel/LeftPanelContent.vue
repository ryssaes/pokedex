<template>
	<div class="content w-100">
		<List />
	</div>
</template>

<script>
	import List from '@/components/List/List.vue';

	export default {
		name: 'LeftPanelContent',
		components: {
			List,
		},
	};
</script>

<style lang="scss" scoped>
	.content {

		@media (min-width: $viewport-medium) {
			margin-top: 50px;
		}
	}
</style>
