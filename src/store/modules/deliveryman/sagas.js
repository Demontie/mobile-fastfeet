import { takeLatest, call, put, all, delay } from 'redux-saga/effects';
import { Alert } from 'react-native';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, ...rest } = payload.data;

    const profile = {
      name,
      email,
      ...(rest.oldPassword ? rest : {}),
    };

    yield delay(1000);
    const response = yield call(api.put, 'deliveryman', profile);
    Alert.alert('Sucesso!', 'Perfil atualizado com sucesso!');

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    Alert.alert(
      'Falha na atualização',
      'Houve um erro na atualização do perfil, confira seus dados!',
    );
    yield put(updateProfileFailure());
  }
}

export default all([
  takeLatest('@deliveryman/UPDATE_PROFILE_REQUEST', updateProfile),
]);
