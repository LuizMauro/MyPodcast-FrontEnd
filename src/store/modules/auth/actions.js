export function logarRequest(email, senha){
    return{
        type: '@auth/SIGN_IN_REQUEST',
        payload: { email, senha },
    };
}

export function logarSuccess(token, user){
    return{
        type:"@auth/SIGN_IN_SUCCESS",
        payload:{ token, user}
    };
}

export function logarFailure(){
    return{
        type:"@auth/SIGN_IN_FAILURE",
    };
}

export function signOut(){
    return{
        type: '@auth/SIGN_OUT',
    }
}