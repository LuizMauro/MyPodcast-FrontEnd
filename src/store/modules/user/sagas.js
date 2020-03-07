import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '../../../services/api';
import { updateProfileSuccess, updateProfileFailure } from './actions';
import { toast } from 'react-toastify';

export function* updateProfile({ payload }) {
	try {
		const { usu_nome, usu_email, ...rest } = payload.data;

		const profile = Object.assign(
			{ usu_nome, usu_email },
			rest.senhaAntiga ? rest : {}
		);

		const response = yield call(api.put, 'edituser', profile);

		if (response.data.usuNomeExists) {
			toast.error('Nome de usuário indisponível');
		} else if (response.data.usuEmailExists) {
			toast.error('E-mail já cadastrado');
		} else {
			toast.success('Perfil atualizado com sucesso');
			yield put(updateProfileSuccess(response.data));
		}
	} catch (err) {
		toast.error('Erro ao atualizar perfil');
		yield put(updateProfileFailure);
	}
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
