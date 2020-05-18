export function logarRequest(email, senha) {
  return {
    type: "@auth/SIGN_IN_REQUEST",
    payload: { email, senha },
  };
}

export function logarSuccess(token, user) {
  return {
    type: "@auth/SIGN_IN_SUCCESS",
    payload: { token, user },
  };
}

export function logarFailure() {
  return {
    type: "@auth/SIGN_IN_FAILURE",
  };
}

export function RefreshToken(token, user) {
  return {
    type: "@auth/REFRESH_TOKEN",
    payload: { token, user },
  };
}

export function signUpRequest(nome, senha, email, cpf, tus_id) {
  return {
    type: "@auth/SIGN_UP_REQUEST",
    payload: { nome, senha, email, cpf, tus_id },
  };
}

export function signOut() {
  return {
    type: "@auth/SIGN_OUT",
  };
}

export function forgotPasswordRequest(usu_email) {
  return {
    type: "@user/FORGOT_PASSWORD_REQUEST",
    payload: { usu_email },
  };
}

export function resetPasswordRequest(usu_email, usu_reset_token, usu_senha) {
  return {
    type: "@user/RESET_PASSWORD_REQUEST",
    payload: { usu_email, usu_reset_token, usu_senha },
  };
}
