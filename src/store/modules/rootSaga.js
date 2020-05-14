import { all } from 'redux-saga/effects';

import auth from './auth/sagas';
import user from './user/sagas';
import ctg from './categoria/sagas'
import podcast from './podcast/sagas'
import comentario from './comentario/sagas'
import publicidade from './publicidade/sagas'

export default function* rootSaga(){
    return yield all([auth, user, ctg, podcast, comentario, publicidade]);
    
}
