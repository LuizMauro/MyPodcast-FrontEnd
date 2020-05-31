import { takeLatest, call, all } from 'redux-saga/effects';

import api from '../../../services/api';
import { toast } from 'react-toastify';

export function* createPodcast({ payload }) {
	const {
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
	} = payload;

	try {
		const response = yield call(api.post, '/adm/criarpodcast', {
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
		});

		if (response.data.podCreated) {
			toast.success('Podcast cadastrado!');
			console.log(response.data);
		} else if (response.data.nomeExists) {
			toast.error('Nome de Podcast já cadastrado');
		} else if (response.data.descricaoExists) {
			toast.error('Este podcast já foi cadastrado');
		} else if (response.data.linkExists) {
			toast.error('Link(s) inválido(s)');
		}
	} catch (err) {
		toast.error('Erro ao cadastrar podcast');
		console.tron.log(err);
	}
}

export function* updatePodcast({ payload }) {
	try {
		const { ctg_descricao, ctg_id } = payload;

		yield call(api.put, `/adm/Podcast/${ctg_id}`, {
			ctg_descricao,
		});
		toast.success('Podcast editada');
	} catch (err) {
		toast.error('Erro ao atualizar Podcast');
	}
}

export function* deletePodcast({ payload }) {
	try {
		const { ctg_descricao, ctg_id } = payload;

		yield call(api.put, `/Podcast/${ctg_id}`, {
			ctg_descricao,
		});
		toast.success('Podcast editada');
	} catch (err) {
		toast.error('Erro ao atualizar Podcast');
	}
}

export function* updateSolicitacao({ payload }) {
	try {
		const { pod_id, pod_permissao } = payload;

		yield call(api.put, `/podcasts/solicitacao/${pod_id}/${pod_permissao}`);
		
	} catch (err) {
		toast.error('Erro com a solicitação de cadastro.');
	}
}

export default all([
	takeLatest('@podcast/CREATE_PODCAST_REQUEST', createPodcast),
	takeLatest('@podcast/UPDATE_PODCAST_REQUEST', updatePodcast),
	takeLatest('@podcast/DELETE_PODCAST_REQUEST', deletePodcast),
	takeLatest('@podcast/UPDATE_SOLICITACAO_REQUEST', updateSolicitacao),
]);
