// Importa o Vue para criar um objeto Vue observável
import Vue from 'vue';

// Define constantes para limitar o número de resultados e definir o deslocamento inicial na busca dos resultados
const LIMIT = 25;
const OFFSET = 0;

// Exporta um objeto Vue observável
export default Vue.observable({
	// Lista vazia que será preenchida com os resultados da busca
	list: [],
	// Lista temporária que pode ser usada para armazenar dados temporários durante a manipulação ou filtragem dos resultados
	tmpList: [],
	// Indicador de que há mais resultados disponíveis para busca
	listHasNext: false,
	// Indicador de que a busca por resultados foi concluída
	listHasCompleted: false,
	// Indicador de que ocorreu um erro durante a busca por resultados
	listHasError: false,
	// Indicador de que uma busca está em andamento
	isSearching: false,
	// Indicador de que a busca está sendo feita por Pokémon específicos
	isPokemonSearch: false,
	// Indicador de que ocorreu um erro durante a busca
	searchHasError: false,
	// Limite de resultados a serem buscados, inicialmente definido como 25
	limit: LIMIT,
	// Deslocamento inicial na busca dos resultados, inicialmente definido como 0
	offset: OFFSET,
});
