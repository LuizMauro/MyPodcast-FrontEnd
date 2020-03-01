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

    yield put(logarSuccess(token, user));

    if((user.tus_id === 4)){
        history.push('/adm/dashboard');
    }

    if((user.tus_id === 3)){
        history.push('/mod/dashboard');
    }


}

export function signOut(){
    history.push('/');
}

export default all([
    takeLatest('@auth/SIGN_IN_REQUEST', logar),
    takeLatest('@auth/SIGN_OUT', signOut)
])