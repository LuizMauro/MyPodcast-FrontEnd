export function createComentarioRequest(cmt_conteudo, pod_id, usu_id) {
	return {
		type: '@ctg/CREATE_COMENTARIO_REQUEST',
		payload: { cmt_conteudo, pod_id, usu_id }
	};
}

export function updateCategoriaRequest(ctg_descricao, ctg_id) {
	return {
		type: '@ctg/UPDATE_COMENTARIO_REQUEST',
		payload: { ctg_descricao, ctg_id }
	};
}

