export const parsePokemonInfo = info => ({
	id: info.id,
	name: info.name,
	types: info.types.map(({ type }) => type.name),
	sprite: info.sprites.front_default || 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png',
	stats: info.stats,
	sprites: info.sprites, // Adiciona os sprites do Pokémon
	moves: info.moves, // Adiciona os movimentos do Pokémon
	evolutions: info.evolutions, // Adiciona as evoluções do Pokémon
	games: info.game_indices // Adiciona os games em que o Pokémon está presente
  });
