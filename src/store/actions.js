import pokeApi from '@/services/pokeapi'; // Importa o módulo de serviço pokeApi, que contém funções para fazer requisições à API da Pokédex.
import state from './state'; // Importa o objeto de estado da aplicação Vue relacionado à Pokédex.
import mutations from './mutations'; // Importa o objeto de mutações que contém os métodos para modificar o estado da aplicação.
import { search } from 'core-js/fn/symbol'; // Importa a função de busca (search) do pacote core-js, mas não é utilizada neste trecho de código.

export default {
	async getPokemons() { // Define um método assíncrono para obter os Pokémon.
		// Extrai os métodos de mutação do objeto mutations
		const {
			setList,
			setIsPokemonSearch,
			setListHasError,
			setListHasNext,
			setListHasCompleted,
			updateOffset,
		} = mutations; // Extrai os métodos específicos de mutação do objeto mutations.

		try {
			// Define o estado de isPokemonSearch e listHasError como false para limpar possíveis estados anteriores
			setIsPokemonSearch(false);
			setListHasError(false);

			// Faz a requisição à API da Pokédex para obter a lista de pokémons com base no limite e deslocamento atuais
			const pokemonsList = await pokeApi.getPokemons({ limit: state.limit, offset: state.offset });

			// Verifica se a lista de pokémons foi retornada com sucesso e se possui resultados
			if (pokemonsList?.results?.length) {
				// Prepara uma lista de requisições individuais para obter informações detalhadas de cada pokémon
				const prepareInfo = pokemonsList.results.map(item => pokeApi.getPokemonByName(item.name));

				// Aguarda todas as requisições individuais serem concluídas
				const pokemonsInfo = await Promise.all(prepareInfo);

				// Chama o método de mutação para adicionar os pokémons à lista principal da Pokédex
				setList(pokemonsList);
			}

			if (pokemonsList?.next) { // Se houver uma próxima página de resultados.
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

	async getPokemonByName(name){
		const { setPokemonSearched } = mutations;

		const pokemon = await pokeApi.getPokemonByName(name);

		if(pokemon){
			setPokemonSearched(pokemon);
		}
	},

	async searchPokemon(name){ // Define um método assíncrono para buscar um Pokémon pelo nome.
		const {
			setIsPokemonSearch,
			setIsSearching,
			setPokemonSearched,
			setListHasError,
			resetList,
		} = mutations; // Extrai os métodos específicos de mutação do objeto mutations.

		if (!name){ // Se o nome fornecido for vazio.
			resetList(); // Limpa a lista de Pokémon.
			return; // Sai do método.
		}

		try{
			setSearchHasError(false); // Limpa o estado de erro da busca.
			setIsSearching(true); // Ativa o estado de busca.
			setIsPokemonSearch(true); // Ativa o estado indicando que a busca é por um Pokémon.

			const pokemon = state.list.find(info => info.name === name.toLowercase()); // Procura o Pokémon na lista de Pokémon atual.

			if(pokemon) { // Se o Pokémon for encontrado na lista.
				setPokemonSearched(pokemon); // Define o Pokémon encontrado como o Pokémon buscado.
				return; // Sai do método.
			}

			await this.getPokemonByName(name); // Se o Pokémon não estiver na lista, busca o Pokémon pelo nome.
		} catch (error) {
			setSearchHasError(true); // Se houver um erro durante a busca, define o estado de erro da busca.
		} finally {
			setIsSearching(false); // Finaliza o estado de busca.
		}
	}
};
