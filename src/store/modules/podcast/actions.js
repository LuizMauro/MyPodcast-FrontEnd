export function createPodcastRequest(
	pod_nome,
	pod_descricao,
	pod_criador,
	pod_anocriacao,
	pod_duracao,
	pod_permissao,
	list_of_categoria,
	end_link1,
	end_link2,
	end_link3,
	file
) {
	console.tron.log(
		'a data é',
		pod_nome,
		pod_descricao,
		pod_criador,
		pod_anocriacao,
		pod_duracao,
		pod_permissao,
		list_of_categoria,
		end_link1,
		end_link2,
		end_link3,
		file
	);

	return {
		type: '@podcast/CREATE_PODCAST_REQUEST',
		payload: {
			pod_nome,
			pod_descricao,
			pod_criador,
			pod_anocriacao,
			pod_duracao,
			pod_permissao,
			list_of_categoria,
			end_link1,
			end_link2,
			end_link3,
			file,
		},
	};
}

export function updatePodcastRequest(ctg_descricao, ctg_id) {
	return {
		type: '@podcast/UPDATE_PODCAST_REQUEST',
		payload: { ctg_descricao, ctg_id },
	};
}

export function deletePodcastRequest(ctg_descricao, ctg_id) {
	return {
		type: '@podcast/DELETE_PODCAST_REQUEST',
		payload: { ctg_descricao, ctg_id },
	};
}

export function updateSolicitacaoRequest(pod_id, pod_permissao) {
	return {
		type: '@podcast/UPDATE_SOLICITACAO_REQUEST',
		payload: { pod_id, pod_permissao },
	};
}
