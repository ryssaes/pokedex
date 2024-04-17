<template>
	<div class="container">
		<div class="row">
			<div class="col-lg-12 col-md-12 col-sm-12">
				<div id="pokedex">
					<h1 class="text--yellow">Pokedex</h1>
				</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'App',
};
</script>

<style lang="scss" scoped>
#pokedex {
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	margin: 0 auto;
	padding: 24px;
}
</style>
