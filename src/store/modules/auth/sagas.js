import { takeLatest, call , put, all } from 'redux-saga/effects';

import { logarSuccess }  from './actions'

import api from '../../../services/api'
import history from '../../../services/history'

export function* logar({ payload }){
    const { email, senha } = payload;

    const response = yield call(api.post,'sessions',{
        email,
        senha
    });

    const { token, user} = response.data;

    if(!(user.tus_id === 4)){
        console.tron.error('Sem permissao - ADM');
        return;
    }

    yield put(logarSuccess(token, user));

    history.push('/dashboard');

}

export default all([
    takeLatest('@auth/SIGN_IN_REQUEST', logar)
])