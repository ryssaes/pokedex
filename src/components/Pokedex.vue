<template>
	<div class="pokedex position-relative d-flex flex-colum w-100 h-100">
		<TopPanel />
		<LeftPanel class="pokedex--left" />
		<Divider />
		<RightPanel class="pokedex--right" />
	</div>
</template>

<script>
import TopPanel from './TopPanel/TopPanel.vue';
import LeftPanel from './LeftPanel/LeftPanel.vue';
import RightPanel from './RightPanel/RightPanel.vue';
import Divider from './Divider/Divider.vue';

export default {
	name: 'Pokedex',
	components: {
		TopPanel,
		LeftPanel,
		RightPanel,
		Divider,
	},
};
</script>

<style lang="scss" scoped>
.pokedex {
	max-width: 960px;

	@media (min-width: $viewport-medium) {
		max-height: 700px;
		flex-direction: row;
	}

	&--left,
	&--right {
		position: relative;
		display: flex;
		height: 50%;
		perspective: 1700px;
		transform-style: preserve-3d;

		@media (min-width: $viewport-medium) {
			height: 100%;
		}
	}
}

@media (max-width: 560px) {

	.pokedex--left{
    position: relative;
    display: flex;
    height: 65%;
    perspective: 1700px;
    transform-style: preserve-3d;
}
}

@media (max-width: 550px) {
	.pokedex {
		width: 320px !important;
	}
}

@media (max-width: 550px) {

	.pokedex--left,
	.pokedex--right {
		position: relative;
		display: flex;
		height: 57% !important;
		perspective: 1700px;
		transform-style: preserve-3d;
	}
}
</style>
