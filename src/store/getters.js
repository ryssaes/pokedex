import state from './state'; // Importa o objeto de estado da aplicação Vue relacionado à Pokédex.

export default {
	// Define uma propriedade computada chamada 'pokemonsInfo'
	get pokemonsInfo() {
		// Mapeia cada item na lista de pokémons para um novo objeto com informações resumidas
		return state.list.map(info => ({
			// ID do pokémon
			id: info.id,
			// Nome do pokémon
			name: info.name,
			// Lista dos tipos do pokémon
			types: info.types.map(({ type }) => type.name),
			// URL do sprite frontal do pokémon, ou um URL padrão se não estiver disponível
			sprite: info.sprites.front_default || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
		}));
	},
};
