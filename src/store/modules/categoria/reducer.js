import produce from 'immer';

const INITIAL_STATE = {
	ctg_categoria: null
};

export default function user(state = INITIAL_STATE, action) {
	return produce(state, (draft) => {
		switch (action.type) {
			case '@ctg/CREATE_CATEGORIA_REQUEST': {
				draft.ctg_categoria = action.payload.ctg_categoria;
				break;
			}

			default:
		}
	});
}
