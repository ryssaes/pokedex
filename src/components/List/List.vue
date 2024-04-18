<template>
	<ul class="list text--white bg--black d-flex flex-colum w-100 h-100"></ul>
</template>

<script>

export default {
	name: 'List',
};
</script>

<style lang="scss" scoped>
.list {
	border: 10px solid color(white);
	border-radius: 8px;
	padding: 0 8px 8px 0;
	overflow-y: scroll;
	-ms-overflow-style: none;
	scrollbar-width: none;

	&::-webkit-scrollbar {
		display: none;
	}

	@media (min-width: $viewport-medium) {
		max-height: 72%;
		border: 20px solid color(white);
	}

	&--message {
		text-align: center;
		margin-top: 8px;
	}
}
</style>
