<template>
	<div class="pokemon">
		<ListItem v-if="mainInfo" v-bind="mainInfo" />
		<ul class="stats" v-if="stats.length">
			<li v-for="(stat, index) in stats" :key="index">
				{{ parseStatName(stat.stat.name) }}: {{ stat.base_stat }}
			</li>
		</ul>
		<div class="additional-info" v-if="mainInfo">
			<h3>Sprites</h3>
			<ul>
				<li v-if="mainInfo.sprites.front_default">
					Front Default:
					<img :src="mainInfo.sprites.front_default" alt="Front Default Sprite" />
				</li>
				<li v-if="mainInfo.sprites.back_default">
					Back Default:
					<img :src="mainInfo.sprites.back_default" alt="Back Default Sprite" />
				</li>
				<li v-if="mainInfo.sprites.front_shiny">
					Front Shiny:
					<img :src="mainInfo.sprites.front_shiny" alt="Front Shiny Sprite" />
				</li>
				<li v-if="mainInfo.sprites.back_shiny">
					Back Shiny:
					<img :src="mainInfo.sprites.back_shiny" alt="Back Shiny Sprite" />
				</li>
			</ul>
			<h3 v-if="mainInfo.moves">Moves</h3>
			<ul v-if="mainInfo.moves">
				<li v-for="move in mainInfo.moves" :key="move.move.name">
					{{ move.move.name }}
				</li>
			</ul>
			<h3 v-if="mainInfo.evolutions">Evolutions</h3>
			<ul v-if="mainInfo.evolutions">
				<li v-for="evolution in mainInfo.evolutions" :key="evolution.name">
					{{ evolution.name }}
				</li>
			</ul>
			<h3 v-if="mainInfo.games">Games</h3>
			<ul v-if="mainInfo.games">
				<li v-for="game in mainInfo.games" :key="game.version.name">
					<a :href="game.version.url" target="_blank">{{ formatGameName(game.version.name) }}</a>
				</li>
			</ul>
		</div>
		<div v-else class="no-info">No information available</div>
	</div>
</template>

<script>
import ListItem from '@/components/List/ListItem.vue';
import { state } from '@/store';
import { parsePokemonInfo } from '@/utils';

export default {
	name: 'PokemonDescription',
	components: {
		ListItem,
	},
	props: {
		id: {
			type: Number,
			required: true,
		},
	},
	data() {
		return {
			mainInfo: null,
			stats: [],
		};
	},
	created() {
		const pokemonInfo = state.list.find(pokemon => pokemon.id === this.id);

		if (pokemonInfo) {
			const infoParsed = parsePokemonInfo(pokemonInfo);

			const { stats, ...rest } = infoParsed;

			this.mainInfo = rest;
			this.stats = stats;
		}
	},
	methods: {
		parseStatName(name) {
			const statsNames = {
				hp: 'HP',
				attack: 'Attack',
				defense: 'Defense',
				speed: 'Speed',
				'special-attack': 'Sp. Atk',
				'special-defense': 'Sp. Def',
			};
			return statsNames[name] || name;
		},
		formatGameName(name) {
			// Convert game name to more readable format
			return name.replace(/-/g, ' ').toUpperCase();
		},
	},
};
</script>

<style lang="scss" scoped>
.pokemon {
	margin-bottom: 20px;
}

.stats {
	padding: 0 24px;
}

.additional-info {
	padding: 10px 24px;
}

h3{
	padding-bottom: 10px;
}

a{
	color: white;
	text-decoration: none;
}

.no-info {
	font-style: italic;
	color: #999;
	text-align: center;
	margin-top: 20px;
}
</style>
