<<<<<<< HEAD
export function updateProfileRequest(usu_senha, confirmarSenha) {
  return {
    type: "@user/UPDATE_PROFILE_REQUEST",
    payload: { usu_senha, confirmarSenha },
  };
=======
export function updateProfileRequest(usu_nome, usu_email, senhaAntiga, usu_senha, confirmaSenha) {
	return {
		type: '@user/UPDATE_PROFILE_REQUEST',
		payload: { usu_nome, usu_email, senhaAntiga, usu_senha, confirmaSenha }
	};
>>>>>>> 84478d8dda81b03eab9e5435cab63f0f7790a527
}

export function updateStatusRequest(usu_id, usu_status) {
  return {
    type: "@user/UPDATE_STATUS_REQUEST",
    payload: { usu_id, usu_status },
  };
}

export function updateModeradorRequest(usu_id, tus_id) {
  return {
    type: "@user/UPDATE_MODERADOR_REQUEST",
    payload: { usu_id, tus_id },
  };
}

export function updateToPodcasterRequest() {
  return {
    type: "@user/UPDATE_TOPODCASTER_REQUEST",
  };
}

export function updateToPodcasterSuccess(tus_descricao) {
  return {
    type: "@user/UPDATE_TOPODCASTER_SUCCESS",
    payload: { tus_descricao },
  };
}

export function updateProfileSuccess(profile) {
  return {
    type: "@user/UPDATE_PROFILE_SUCCESS",
    payload: { profile },
  };
}

export function updateProfileFailure() {
  return {
    type: "@user/UPDATE_PROFILE_FAILURE",
  };
}
