<template>
	<div class="container">
		<div class="row">
			<div class="col-lg-12 col-md-12 col-sm-12">
				<div id="pokedex">
					<Pokedex />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import Pokedex from './components/Pokedex.vue'
export default {
	name: 'App',
	components: {
		Pokedex,
	},
};
</script>

<style lang="scss" scoped>
#pokedex {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	height: calc(100vh - 20px);
	padding: 20px;
}
</style>
