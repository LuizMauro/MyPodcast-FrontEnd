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

		toast.success('Perfil atualizado com sucesso');

		yield put(updateProfileSuccess(response.data));
	} catch (err) {
		toast.sucess('Erro ao atualizar perfil, confira seus dados.');
		yield put(updateProfileFailure);
	}
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
