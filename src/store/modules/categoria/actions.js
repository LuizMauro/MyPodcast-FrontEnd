export function createCategoriaRequest(ctg_descricao) {
	return {
		type: '@ctg/CREATE_CATEGORIA_REQUEST',
		payload: { ctg_descricao }
	};
}

export function updateCategoriaRequest(ctg_descricao, ctg_id) {
	return {
		type: '@ctg/UPDATE_CATEGORIA_REQUEST',
		payload: { ctg_descricao, ctg_id }
	};
}

