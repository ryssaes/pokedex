// Importa o objeto state do arquivo state.js
import state from './state';

export default {
	// Método para atualizar o deslocamento na busca dos resultados da Pokédex
	updateOffset() {
		// Incrementa o deslocamento pelo limite atual
		state.offset += state.limit;
	},

	// Método para adicionar pokémons à lista da Pokédex
	setList(list) {
		// Adiciona os elementos da lista recebida ao final da lista principal e da lista temporária
		state.list.push(...list);
		state.tmpList.push(...list);
	},

	// Método para definir se a Pokédex precisa de mais dados
	setListHasNext(flag) {
		state.listHasNext = flag;
	},

	// Método para definir se a Pokédex terminou de buscar os dados
	setListHasCompleted(flag) {
		state.listHasCompleted = flag;
	},

	// Método para definir se a Pokédex encontrou um erro ao buscar os dados
	setListHasError(flag) {
		state.listHasError = flag;
	},

	// Método para redefinir a lista da Pokédex para o último cache e limpar as informações relacionadas à busca
	resetList() {
		// Restaura a lista principal para o último cache
		state.list = [...state.tmpList];
		// Define isPokemonSearch como false para indicar que não está mais em uma busca por Pokémon específicos
		state.isPokemonSearch = false;
		// Define listHasError e searchHasError como false para limpar quaisquer indicadores de erro
		state.listHasError = false;
		state.searchHasError = false;
	},
};
