export function updateProfileRequest(data) {
	return {
		type: '@user/UPDATE_PROFILE_REQUEST',
		payload: { data }
	};
}

export function updateStatusRequest(usu_id, usu_status) {
	return {
		type: '@user/UPDATE_STATUS_REQUEST',
		payload: {usu_id, usu_status}
	};
}


export function updateModeradorRequest(usu_id, tus_id) {
	return {
		type: '@user/UPDATE_MODERADOR_REQUEST',
		payload: {usu_id, tus_id}
	};
}

export function updateToPodcasterRequest() {
	return {
		type: '@user/UPDATE_TOPODCASTER_REQUEST'
	};
}

export function updateToPodcasterSuccess(profile) {
	return {
		type: '@user/UPDATE_TOPODCASTER_SUCCESS',
		payload: { profile }
	};
}

export function updateProfileSuccess(profile) {
	return {
		type: '@user/UPDATE_PROFILE_SUCCESS',
		payload: { profile }
	};
}

export function updateProfileFailure() {
	return {
		type: '@user/UPDATE_PROFILE_FAILURE'
	};
}



