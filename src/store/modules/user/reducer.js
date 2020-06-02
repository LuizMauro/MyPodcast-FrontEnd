import produce from "immer";

const INITIAL_STATE = {
  profile: null,
};

export default function user(state = INITIAL_STATE, action) {
  return produce(state, (draft) => {
    switch (action.type) {
      case "@auth/SIGN_IN_SUCCESS": {
        draft.profile = action.payload.user;
        break;
      }
      case "@user/UPDATE_PROFILE_SUCCESS": {
        draft.profile = action.payload.profile;
        break;
      }
      case "@user/UPDATE_TOPODCASTER_SUCCESS": {
        draft.profile.tus_descricao = action.payload.tus_descricao;
        draft.profile.tus_id = action.payload.tus_id;
        break;
      }
      case "@user/UPDATE_PREMIUM_SUCCESS": {
        draft.profile.usu_premium = action.payload.usu_premium;
        break;
      }
      case "@auth/SIGN_OUT": {
        draft.profile = null;
        break;
      }
      default:
    }
  });
}
