import PokeAPI from '@/services/pokeapi'; // Importa o módulo de serviço PokeAPI, que contém funções para interagir com a API do Pokémon.

import state from './state'; // Importa o objeto de estado da aplicação relacionado à Pokédex.
import mutations from './mutations'; // Importa o objeto de mutações que contém os métodos para modificar o estado da aplicação.

export default {
	async getPokemons() {
		// Extrai os métodos de mutação do objeto mutations
		const {
			setList,
			setIsPokemonSearch,
			setListHasError,
			setListHasNext,
			setListHasCompleted,
			updateOffset,
		} = mutations;

		try {
			// Define o estado de busca e de erro como falso para limpar possíveis estados anteriores.
			setIsPokemonSearch(false);
			setListHasError(false);

			// Faz a requisição à API do Pokémon para obter a lista de pokémons com base no limite e deslocamento atuais.
			const pokemonsList = await PokeAPI.getPokemons({ limit: state.limit, offset: state.offset });

			// Verifica se a lista de pokémons foi retornada com sucesso e se possui resultados.
			if (pokemonsList?.results?.length) {
				// Prepara uma lista de requisições individuais para obter informações detalhadas de cada pokémon.
				const prepareInfo = pokemonsList.results.map(item => PokeAPI.getPokemonByName(item.name));

				// Aguarda todas as requisições individuais serem concluídas.
				const pokemonsInfo = await Promise.all(prepareInfo);
				console.log(pokemonsInfo)
				// Chama o método de mutação para adicionar os pokémons à lista principal da Pokédex.
				setList(pokemonsInfo);
			}

			// Verifica se há uma próxima página de resultados.
			if (pokemonsList?.next) {
				setListHasNext(true); // Ativa a flag indicando que há mais resultados disponíveis.
				updateOffset(); // Atualiza o deslocamento para a próxima página.
			} else {
				setListHasNext(false); // Desativa a flag indicando que não há mais resultados disponíveis.
				setListHasCompleted(true); // Indica que a lista de Pokémon foi completamente carregada.
			}
		} catch (error) {
			setListHasError(true); // Se houver um erro durante a obtenção da lista de Pokémon, define a flag de erro.
		}
	},

	async getPokemonByName(name) {
		const { setPokemonSearched } = mutations;

		// Obtém informações sobre um Pokémon específico pelo nome.
		const pokemon = await PokeAPI.getPokemonByName(name);

		if (pokemon) {
			setPokemonSearched(pokemon); // Define o Pokémon obtido como o Pokémon buscado.
		}
	},

	async searchPokemon(name) {
		const {
			setIsPokemonSearch,
			setIsSearching,
			setPokemonSearched,
			setSearchHasError,
			resetList,
		} = mutations;

		// Se o nome de pesquisa for vazio, limpa a lista e sai da função.
		if (!name) {
			resetList(); // Limpa a lista de Pokémon.
			return; // Sai do método.
		}

		try {
			setSearchHasError(false); // Limpa o estado de erro da busca.
			setIsSearching(true); // Ativa o estado de busca.
			setIsPokemonSearch(true); // Ativa o estado indicando que a busca é por um Pokémon.

			// Procura o Pokémon na lista temporária de pokémons.
			const pokemon = state.tmpList.find(info => info.name.toLowerCase() === name.toLowerCase());

			// Se o Pokémon for encontrado na lista temporária.
			if (pokemon) {
				setPokemonSearched(pokemon); // Define o Pokémon encontrado como o Pokémon buscado.
				return; // Sai do método.
			}

			await this.getPokemonByName(name); // Se o Pokémon não estiver na lista temporária, busca o Pokémon pelo nome.
		} catch (error) {
			setSearchHasError(true); // Se houver um erro durante a busca, define o estado de erro da busca.
		} finally {
			setIsSearching(false); // Finaliza o estado de busca.
		}
	},
};
