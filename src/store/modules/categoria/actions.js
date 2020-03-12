export function createCategoriaRequest(ctg_descricao) {
	return {
		type: '@ctg/CREATE_CATEGORIA_REQUEST',
		payload: { ctg_descricao }
	};
}
